import { Client } from 'grpc-web';
import { load } from '@grpc/proto-loader';

const PROTO_FILE_PATH = '../../../Backend/cart.proto';
const packageDefinition = load(PROTO_FILE_PATH);
const service = packageDefinition.services.CartService;

const grpcClient = new Client(service, {
    transport: 'http',
    debug: false,
});

export default grpcClient;
