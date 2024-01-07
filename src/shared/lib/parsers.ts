export function formDataToObject(data: FormData): object {
    const body: Record<string, any> = {};

    for (const key of data.keys()) {
        const file: any = data.get(key);

        for (const fileKey in file) {
            body[key][fileKey] = file?.[fileKey]
        }
    }

    return body;
}

export function objectToError(data: Record<string, any>): object {
    const body: Record<string, any> = {};

    for (const key in data) {
        if (typeof data[key] === 'object') {
            const nestedObject: object = objectToError(data[key]);

            Object.assign(body, nestedObject);

            continue;
        }

        body[key] = data[key];
    }

    return { error: body };
}