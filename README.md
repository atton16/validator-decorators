# validator-decorators

A collection of validator decorators. Fully compatible with [class-validator](https://github.com/typestack/class-validator), NestJS and TypeScript.

## Installation

```bash
npm install validator-decorators
```

## Usage

```typescript
import { IsNumeral, IsInCaseInsensitive } from 'validator-decorators';

class Prize {
  @IsNumeral()
  rank: string;

  @IsInCaseInsensitive(['medal', 'silver', 'bronze'])
  label: string;
}

```

## Validation decorators

| Decorator | Description |
|-----------|-------------|
| `@IsInCaseInsensitive(values: any[])` | Checks if value is in a array of allowed values. (Case-insensitive) |
| `@IsNumeral(culture?: string)` | Checks if value passed numeral.validate() validation. |

## License

ISC License

Copyright (c) 2020, Attawit Kittikrairit

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
