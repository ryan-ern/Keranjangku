# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: cart.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\ncart.proto\"\x1d\n\x0b\x43\x61rtRequest\x12\x0e\n\x06userId\x18\x01 \x01(\t\"G\n\x08\x43\x61rtItem\x12\n\n\x02id\x18\x01 \x01(\x05\x12\x0c\n\x04name\x18\x02 \x01(\t\x12\r\n\x05price\x18\x03 \x01(\x05\x12\x12\n\ncount_item\x18\x04 \x01(\x05\"}\n\x0c\x43\x61rtResponse\x12\x0f\n\x07message\x18\x01 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x02 \x01(\t\x12\x1d\n\ncart_items\x18\x03 \x03(\x0b\x32\t.CartItem\x12\x13\n\x0btotal_items\x18\x04 \x01(\x05\x12\x13\n\x0btotal_price\x18\x05 \x01(\x05\x32<\n\x0b\x43\x61rtService\x12-\n\x0eGetCartDetails\x12\x0c.CartRequest\x1a\r.CartResponseb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'cart_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  DESCRIPTOR._options = None
  _globals['_CARTREQUEST']._serialized_start=14
  _globals['_CARTREQUEST']._serialized_end=43
  _globals['_CARTITEM']._serialized_start=45
  _globals['_CARTITEM']._serialized_end=116
  _globals['_CARTRESPONSE']._serialized_start=118
  _globals['_CARTRESPONSE']._serialized_end=243
  _globals['_CARTSERVICE']._serialized_start=245
  _globals['_CARTSERVICE']._serialized_end=305
# @@protoc_insertion_point(module_scope)
