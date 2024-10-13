protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto \
--ts_proto_out=./apps ./apps/**/src/proto/*.proto \
--ts_proto_opt=nestJs=true \
--ts_proto_opt=addGrpcMetadata=true \
--ts_proto_opt=emitImportedFiles=false \
-I=./apps \
--ts_proto_opt=lowerCaseServiceMethods=false
