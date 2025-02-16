import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Meetings example')
    .setDescription('The meetings API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, {
    ...fixEnumNames(document),
    openapi: '3.1.0',
  });

  await app.listen(3001);
}
bootstrap();

function fixEnumNames(document: OpenAPIObject): OpenAPIObject {
  function recurseProperties(schema: any) {
    if (schema.properties) {
      for (const property in schema.properties) {
        const propertySchema = schema.properties[property];

        // If 'x-enumNames' exists, apply the fix
        if (propertySchema['x-enumNames'] && propertySchema.$ref) {
          const enumName = propertySchema.$ref.split('/').pop();
          document.components.schemas[enumName]['x-enumNames'] =
            propertySchema['x-enumNames'];
          delete propertySchema['x-enumNames'];
        }

        // Recursively handle nested properties
        recurseProperties(propertySchema);
      }
    }
  }

  // Iterate over all schemas and apply the fix
  for (const schemaName in document.components.schemas) {
    const schema = document.components.schemas[schemaName];
    recurseProperties(schema);
  }

  return document;
}