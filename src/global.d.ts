/// <reference types="@solidjs/start/env" />
type ExtractArrayElementType<T> = T extends (infer U)[] ? U : never;
