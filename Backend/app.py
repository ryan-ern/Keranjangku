from wsgiref.simple_server import make_server
from wsgicors import CORS
from pyramid.config import Configurator
from pyramid.view import view_config
from pyramid.response import FileResponse, Response
import pymysql
import jwt
import datetime
import os

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


# Fungsi untuk membuat token baru
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
            'description': 'Username atau Password salah!'
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
            'description': 'User is authenticated',
            'isLogin': True
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
    if not authentication_header:
        # If token is not in cookies, try to get it from local storage
        authentication_header = request.headers.get('Authorization')
        if authentication_header and authentication_header.startswith('Bearer '):
            authentication_header = authentication_header.split(' ')[1]
    if auth_user:
        with connection.cursor() as cursor:
            sql = "DELETE FROM tokens WHERE jwt_token=%s"
            cursor.execute(sql, (authentication_header))
            connection.commit()

        request.response.headers['Clear-Token'] = 'true'
        request.response.delete_cookie('token')
        return {
            'message': 'ok',
            'description': 'Successfully logged out'
        }
    return {
        'message': 'error',
        'description': 'Token not found'
    }

#fungsi create item
@view_config(route_name='create-item', renderer="json", request_method="POST")
def create_item(request):
    auth_user = auth_jwt_verify(request)
    if auth_user:
        # Mendapatkan data teks dari request
        name = request.POST.get('name')
        description = request.POST.get('description')
        # picture = request.POST['picture'].file
        stok = request.POST.get('stok')
        price = request.POST.get('price')

         # Membaca data gambar dari file
        # picture_data = picture.read()

        # Mendapatkan ekstensi file gambar (contoh: .jpg, .png)
        # picture_filename = request.POST['picture'].filename
        # _, picture_extension = os.path.splitext(picture_filename)

        # print(picture)

        # Mendapatkan timestamp sekarang sebagai string
        # timestamp = str(int(datetime.datetime.now().timestamp()))
        # picture_path = os.path.join('img', f'{name}_{timestamp}{picture_extension}')
        # with open(picture_path, 'wb') as picture_file:
        #     picture_file.write(picture_data)

        # Simpan data item ke dalam database
        with connection.cursor() as cursor:
            sql = "INSERT INTO items (user_id, name, description, stok, price) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(sql, (auth_user['sub'], name, description, stok, price))
            connection.commit()

        return {
            'message': 'ok',
            'description': 'Item created successfully!'
        }
    else:
        request.response.status = 401  # Unauthorized
        return {'message': 'Unauthorized', 'description': 'Token not found'}
    
    # Fungsi update item
@view_config(route_name='update-item', renderer="json", request_method="PUT")
def update_item(request):
    auth_user = auth_jwt_verify(request)
    if auth_user:
        item_id = request.matchdict.get('id')
        name = request.POST.get('name')
        description = request.POST.get('description')
        stok = request.POST.get('stok')
        price = request.POST.get('price')

        with connection.cursor() as cursor:
            sql = "UPDATE items SET name=%s, description=%s, stok=%s, price=%s WHERE id=%s AND user_id=%s"
            cursor.execute(sql, (name, description, stok, price, item_id, auth_user['sub']))
            connection.commit()

        return {
            'message': 'ok',
            'description': 'Item updated successfully!'
        }
    else:
        request.response.status = 401  # Unauthorized
        return {'message': 'Unauthorized', 'description': 'Token not found'}
    
    # Fungsi delete item
@view_config(route_name='delete-item', renderer="json", request_method="DELETE")
def delete_item(request):
    auth_user = auth_jwt_verify(request)
    if auth_user:
        item_id = request.matchdict.get('id')

        with connection.cursor() as cursor:
            sql = "DELETE FROM items WHERE id=%s AND user_id=%s"
            cursor.execute(sql, (item_id, auth_user['sub']))
            connection.commit()

        return {
            'message': 'ok',
            'description': 'Item deleted successfully!'
        }
    else:
        request.response.status = 401  # Unauthorized
        return {'message': 'Unauthorized', 'description': 'Token not found'}

# fungsi endpoint Get Data berdasarkan user_id
@view_config(route_name='item-user', renderer="json", request_method="GET")
def item_user(request):
    auth_user = auth_jwt_verify(request)
    if auth_user:
        with connection.cursor() as cursor:
            sql = "SELECT id, name, description, stok, price FROM items WHERE user_id = %s"
            cursor.execute(sql, (auth_user['sub'],))
            result = cursor.fetchall()

        data = []
        for item in result:
            
            item_data = {
                'id': item['id'],
                'name': item['name'],
                'description': item['description'],
                'stok': item['stok'],
                'price': str(item['price'])
            }
            data.append(item_data)

        return {
            'message': 'ok',
            'description': 'Items retrieved successfully!',
            'data': data
        }
    else:
        request.response.status = 401  # Unauthorized
        return {'message': 'Unauthorized', 'description': 'Token not found'}

# def get_image(request):
#     # Mendapatkan nama file gambar dari parameter URL
#     image_name = request.matchdict['image_name']
    
#     # Mengonversi nama file gambar ke path lokasi file
#     image_path = os.path.join('img', image_name)
    
#     # Memeriksa apakah file gambar ada di server
#     if os.path.exists(image_path):
#         # Mengirimkan file gambar sebagai respons
#         return FileResponse(image_path, request=request)
#     else:
#         # Jika file tidak ditemukan, mengirimkan respons 404 Not Found
#         response = Response('Image not found', status=404)
#         return response
    
# fungsi endpoint Get Data
@view_config(route_name='items', renderer="json", request_method="GET")
def items(request):
    auth_user = auth_jwt_verify(request)
    if auth_user:
        with connection.cursor() as cursor:
            sql = "SELECT id, name, description, stok, price FROM items"
            cursor.execute(sql)
            result = cursor.fetchall()
        data = []
        for item in result:
            # print(item['picture'])
            item_data = {
                'id': item['id'],
                'name': item['name'],
                # 'picture': request.route_url('get-image', image_name=item['picture']).replace("img%5C", ""),
                'description': item['description'],
                'stok': item['stok'],
                'price': str(item['price'])
            }
            # print(item_data)
            data.append(item_data)
    else:
        request.response.status = 401  # Unauthorized
        return {'message': 'Unauthorized', 'description': 'Token not found'}

    return {
        'message': 'ok',
        'description': 'Get data success!',
        'data': data
    }

# Fungsi endpoint Get Detail Item berdasarkan ID
@view_config(route_name='detail-item', renderer="json", request_method="GET")
def item_detail(request):
    auth_user = auth_jwt_verify(request)
    if auth_user:
        # Mendapatkan ID item dari parameter URL
        item_id = request.matchdict['id']

        with connection.cursor() as cursor:
            sql = "SELECT id, name, description, stok, price FROM items WHERE id = %s AND user_id = %s"
            cursor.execute(sql, (item_id, auth_user['sub']))
            result = cursor.fetchone()

        if result:
            item_data = {
                'id': result['id'],
                'name': result['name'],
                'description': result['description'],
                'stok': result['stok'],
                'price': str(result['price'])
            }

            return {
                'message': 'ok',
                'description': 'Item retrieved successfully!',
                'data': item_data
            }
        else:
            request.response.status = 404  # Not Found
            return {'message': 'error', 'description': 'Item not found'}
    else:
        request.response.status = 401  # Unauthorized
        return {'message': 'Unauthorized', 'description': 'Token not found'}
            
if __name__ == "__main__":
    with Configurator() as config:
        config = Configurator(settings={'jwt.secret': 'secret'})
        # konfigurasi endpoint
        config.add_route('index', '/')
        config.add_route('registrasi', '/register')
        config.add_route('login', '/login')
        config.add_route('auth-info', '/auth-info')
        config.add_route('logout', '/logout')
        config.add_route('create-item', '/create-item')
        config.add_route('item-user', '/item-user')
        config.add_route('update-item', '/item-user/{id}/update')
        config.add_route('delete-item', '/item-user/{id}/delete')
        # config.add_route('get-image', '/images/{image_name}')
        # config.add_view(get_image, route_name='get-image')
        config.add_route('items', '/items')
        config.add_route('detail-item', 'detail-item/{id}')
        config.scan()
        app = config.make_wsgi_app()
        app = CORS(app, headers="*", methods="*", maxage="86400", origin="*", expose_headers="*")
    # Menjalankan aplikasi pada server lokal
    server = make_server('0.0.0.0', 6543, app)
    server.serve_forever()
    