import unittest
from pyramid import testing
from app import index, login, logout, register, create_item, update_item, delete_item, item_user, items, item_detail, add_item, cart_detail, get_auth_info

class TestAppViews(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

    def tearDown(self):
        testing.tearDown()

    def test_index_view(self):
        request = testing.DummyRequest()
        response = index(request)
        self.assertEqual(response['message'], 'Server Keranjangku Running!')
        self.assertEqual(response['description'], 'Mari Berbelanja di Keranjangku!')

    def test_register_view(self):
        request = testing.DummyRequest(post={'username': 'newuser', 'password': 'newpass'})
        response = register(request)
        self.assertEqual(response['message'], 'ok')
        self.assertEqual(response['username'], 'newuser')
        self.assertEqual(response['description'], 'Registrasi Berhasil')

if __name__ == '__main__':
    unittest.main()