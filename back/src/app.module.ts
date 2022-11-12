import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/service/todo.service';

@Module({
    imports: [TodoModule],
    controllers: [AppController],
    providers: [AppService, TodoService],
})
export class AppModule {}
