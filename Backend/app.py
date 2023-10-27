from wsgiref.simple_server import make_server
from wsgicors import CORS
from pyramid.config import Configurator
from pyramid.view import view_config
import pymysql
import jwt
import datetime

# Koneksi ke database MySQL
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    db='keranjangku',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)


@view_config(route_name='index', renderer='json',  request_method="GET")
def index(request):
    return {
        'message': 'Server Keranjangku Running!',
        'description': 'Mari Berbelanja di Keranjangku!'
    }

# middleware auth
def auth_jwt_verify(request):
    # Check if the token is present in cookies
    authentication_header = request.cookies.get('token')
    if not authentication_header:
        # If token is not in cookies, try to get it from local storage
        authentication_header = request.headers.get('Authorization')
        if authentication_header and authentication_header.startswith('Bearer '):
            authentication_header = authentication_header.split(' ')[1]

    if authentication_header:
        try:
            decoded_user = jwt.decode(
                authentication_header, 'secret', algorithms=['HS256'])
            with connection.cursor() as cursor:
                sql = "SELECT jwt_token FROM tokens WHERE user_id=%s"
                cursor.execute(sql, (decoded_user['sub'],))
                result = cursor.fetchone()
            if result:
                return decoded_user
        except jwt.ExpiredSignatureError:
            request.response.status = 401  # Unauthorized
    return None


# Fungsi untuk membuat token baru dan refresh token
def create_tokens(user_id):
    payload = {
        'sub': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    }
    jwt_token = jwt.encode(payload, 'secret', algorithm='HS256')

    return jwt_token

# fungsi endpoint login
@view_config(route_name='login', renderer='json',  request_method="POST")
def login(request):
    auth_user = auth_jwt_verify(request)
    if auth_user:
        return {
            'message': 'error',
            'description': 'Already logged in'
        }

    username = request.POST['username']
    password = request.POST['password']

    with connection.cursor() as cursor:
        sql = "SELECT id, username, password FROM users WHERE username=%s AND password=%s"
        cursor.execute(sql, (username, password))
        user = cursor.fetchone()

    if user:
        jwt_token = create_tokens(user['id'])
        with connection.cursor() as cursor:
            sql = "INSERT INTO tokens (user_id, jwt_token) VALUES (%s, %s)"
            cursor.execute(sql, (user['id'], jwt_token))
            connection.commit()
        request.response.set_cookie(
            'token', jwt_token, max_age=1800, httponly=True)

        return {
            'message': 'ok',
            'token': jwt_token,
            'description': 'login success!'
        }
    else:
        return {
            'message': 'error',
            'description': 'login failed!'
        }
    
#fungsi endpoint info login
@view_config(route_name='auth-info', renderer='json', request_method='GET')
def get_auth_info(request):
    auth_user = auth_jwt_verify(request)
    if auth_user:
        with connection.cursor() as cursor:
            sql = "SELECT username FROM users WHERE id=%s"
            cursor.execute(sql, auth_user['sub'])
            user = cursor.fetchone()
        return {
            'message': 'ok',
            'username': user['username'],
            'description': 'User is authenticated'
        }
    else:
        return {
            'message': 'error',
            'description': 'User is not authenticated'
        }

# fungsi endpoint register
@view_config(route_name='registrasi', renderer="json", request_method="POST")
def register(request):
    username = request.POST['username']
    password = request.POST['password']
    if username == "" or password == "":
        return {'message': 'error', 'description': 'Username atau password tidak boleh kosong!'}
    else:
        with connection.cursor() as cursor:
            sql = "SELECT username FROM users WHERE username=%s"
            cursor.execute(sql, (username))
            user = cursor.fetchone()
            if user:
                return {'message': 'error', 'description': 'Username Sudah Terdaftar!'} 
            else:
                with connection.cursor() as cursor:
                    sql = "INSERT INTO users (username, password) VALUES (%s, %s)"
                    cursor.execute(sql, (username, password))
                    connection.commit()
                    if sql:
                        return {
                            'message': 'ok',
                            'username': username,
                            'description': 'Registrasi Berhasil'
                        }
                    else:
                        return {
                            'message': 'error',
                            'description': 'registrasi failed'
                        }
            
# fungsi endpoint logout
@view_config(route_name='logout', renderer='json', request_method="DELETE")
def logout(request):
    auth_user = auth_jwt_verify(request)
    authentication_header = request.cookies.get('token')
    if auth_user:
        with connection.cursor() as cursor:
            sql = "DELETE FROM tokens WHERE jwt_token=%s"
            cursor.execute(sql, (authentication_header))
            connection.commit()

        request.response.delete_cookie('token')
        return {
            'message': 'ok',
            'description': 'Successfully logged out'
        }
    return {
        'message': 'error',
        'description': 'Token not found'
    }
            
if __name__ == "__main__":
    with Configurator() as config:
        config = Configurator(settings={'jwt.secret': 'secret'})
        # konfigurasi endpoint
        config.add_route('index', '/')
        config.add_route('registrasi', '/register')
        config.add_route('login', '/login')
        config.add_route('auth-info', '/auth-info')
        config.add_route('logout', '/logout')
        config.scan()
        app = config.make_wsgi_app()
        app = CORS(app, headers="*", methods="*", maxage="180", origin="*", expose_headers="*")
    # Menjalankan aplikasi pada server lokal
    server = make_server('0.0.0.0', 6543, app)
    server.serve_forever()