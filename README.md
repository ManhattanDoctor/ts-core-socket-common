# @ts-core/socket-common

Общая библиотека с интерфейсами, классами и константами для работы с WebSocket-транспортом. Используется как зависимость для `@ts-core/socket-client` и `@ts-core/socket-server`.

## Установка

```bash
npm install @ts-core/socket-common
```

## Зависимости

- `@ts-core/common` — базовые классы и интерфейсы

## Назначение

Библиотека предоставляет общие абстракции для клиент-серверного взаимодействия через WebSocket:

- Интерфейсы запросов и ответов
- Опции команд и событий
- Константы для именования событий
- Базовая реализация транспорта

## Основные интерфейсы

### ITransportSocketRequestPayload

Структура запроса команды:

```typescript
interface ITransportSocketRequestPayload<U = any> {
    id: string;              // Уникальный идентификатор запроса
    name: string;            // Имя команды
    request?: U;             // Данные запроса
    options?: ITransportSocketCommandOptions;  // Опции команды
    isNeedReply?: boolean;   // Требуется ли ответ
}
```

### ITransportSocketResponsePayload

Структура ответа на команду:

```typescript
interface ITransportSocketResponsePayload<V = any> {
    id: string;                      // Идентификатор запроса
    userId?: TransportSocketUserId;  // ID пользователя
    clientId?: string;               // ID клиента
    response?: V | ExtendedError;    // Данные ответа или ошибка
}
```

### ITransportSocketCommandOptions

Опции для команд:

```typescript
interface ITransportSocketCommandOptions {
    timeout?: number;    // Таймаут выполнения
    // ... другие опции
}
```

### ITransportSocketEventOptions

Опции для событий:

```typescript
interface ITransportSocketEventOptions {
    // Опции для отправки событий
}
```

## Константы

Имена событий Socket.IO:

```typescript
import {
    TRANSPORT_SOCKET_ERROR,
    TRANSPORT_SOCKET_EVENT,
    TRANSPORT_SOCKET_CONNECTED,
    TRANSPORT_SOCKET_COMMAND_REQUEST_METHOD,
    TRANSPORT_SOCKET_COMMAND_RESPONSE_METHOD
} from '@ts-core/socket-common';

// Значения констант:
// 'transportSocketError'
// 'transportSocketEvent'
// 'transportSocketConnected'
// 'transportSocketCommandRequest'
// 'transportSocketCommandResponse'
```

## Классы

### TransportSocketImpl

Базовая абстрактная реализация сокет-транспорта:

```typescript
import { TransportSocketImpl } from '@ts-core/socket-common';

class MyTransport extends TransportSocketImpl {
    // Реализация специфичной логики транспорта
}
```

### TransportSocketRequestPayload

Класс для создания payload запроса:

```typescript
import { TransportSocketRequestPayload } from '@ts-core/socket-common';

const payload = new TransportSocketRequestPayload(command, options);
payload.isNeedReply = true;
```

### TransportSocketResponsePayload

Класс для создания payload ответа:

```typescript
import { TransportSocketResponsePayload } from '@ts-core/socket-common';

const response = new TransportSocketResponsePayload(command);
// или парсинг из raw данных
const parsed = TransportSocketResponsePayload.parse(rawData);
```

### TransportSocketUserId

Тип для идентификации пользователя в сокет-соединении:

```typescript
import { TransportSocketUserId } from '@ts-core/socket-common';

type TransportSocketUserId = string | number;
```

### TransportSocketRoomCommand

Команда для управления комнатами:

```typescript
import { TransportSocketRoomCommand } from '@ts-core/socket-common';

// Используется для добавления/удаления клиентов из комнат
const command = new TransportSocketRoomCommand({
    rooms: ['room1', 'room2'],
    action: 'join'  // или 'leave'
});
```

## Пример использования

### Создание кастомного payload

```typescript
import {
    ITransportSocketRequestPayload,
    ITransportSocketResponsePayload,
    TransportSocketRequestPayload
} from '@ts-core/socket-common';

// Создание запроса
const request: ITransportSocketRequestPayload<MyRequestType> = {
    id: 'unique-id-123',
    name: 'my-command',
    request: { data: 'value' },
    isNeedReply: true
};

// Создание ответа
const response: ITransportSocketResponsePayload<MyResponseType> = {
    id: 'unique-id-123',
    response: { result: 'success' }
};
```

### Использование констант событий

```typescript
import {
    TRANSPORT_SOCKET_COMMAND_REQUEST_METHOD,
    TRANSPORT_SOCKET_COMMAND_RESPONSE_METHOD
} from '@ts-core/socket-common';

// На сервере
socket.on(TRANSPORT_SOCKET_COMMAND_REQUEST_METHOD, (payload) => {
    // Обработка запроса
    socket.emit(TRANSPORT_SOCKET_COMMAND_RESPONSE_METHOD, response);
});

// На клиенте
socket.emit(TRANSPORT_SOCKET_COMMAND_REQUEST_METHOD, request);
socket.on(TRANSPORT_SOCKET_COMMAND_RESPONSE_METHOD, (response) => {
    // Обработка ответа
});
```

## Архитектура

```
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│  socket-client  │────▶│    socket-common    │◀────│  socket-server  │
└─────────────────┘     └─────────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────┐
                        │ ts-core/    │
                        │ common      │
                        └─────────────┘
```

## Экспортируемые модули

```typescript
export * from './transport/constants';
export * from './transport/ITransportSocketCommandOptions';
export * from './transport/ITransportSocketEventOptions';
export * from './transport/ITransportSocketRequestPayload';
export * from './transport/ITransportSocketResponsePayload';
export * from './transport/TransportSocketCommandOptions';
export * from './transport/TransportSocketImpl';
export * from './transport/TransportSocketRequestPayload';
export * from './transport/TransportSocketResponsePayload';
export * from './transport/TransportSocketUserId';
export * from './transport/command/TransportSocketRoomCommand';
```

## Связанные пакеты

- `@ts-core/socket-client` — клиентская реализация
- `@ts-core/socket-server` — серверная реализация
- `@ts-core/common` — базовые утилиты

## Автор

**Renat Gubaev** — [renat.gubaev@gmail.com](mailto:renat.gubaev@gmail.com)

- GitHub: [ManhattanDoctor](https://github.com/ManhattanDoctor)
- Repository: [ts-core-socket-common](https://github.com/ManhattanDoctor/ts-core-socket-common)

## Лицензия

ISC
