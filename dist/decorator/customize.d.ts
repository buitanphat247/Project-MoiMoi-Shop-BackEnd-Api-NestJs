export declare const ResponseMessage: (message: string) => import("@nestjs/common").CustomDecorator<string>;
export declare const IS_PUBLIC_KEY = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const User: (...dataOrPipes: unknown[]) => ParameterDecorator;
export declare const IS_PUBLIC_PERMISSION_KEY = "isPublicPermission";
export declare const SkipPermission: () => import("@nestjs/common").CustomDecorator<string>;
