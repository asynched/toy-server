"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = exports.Collection = exports.List = exports.GUID = exports.Bool = exports.Integer = exports.Natural = exports.Avatar = exports.Word = exports.Sentence = exports.Email = exports.Paragraph = exports.Name = void 0;
class Name {
    constructor(options) {
        this.options = options;
    }
    generate(provider) {
        return provider.name(this.options);
    }
}
exports.Name = Name;
class Paragraph {
    constructor(options) {
        this.options = options;
    }
    generate(provider) {
        return provider.paragraph(this.options);
    }
}
exports.Paragraph = Paragraph;
class Email {
    constructor(options) {
        this.options = options;
    }
    generate(provider) {
        return provider.email(this.options);
    }
}
exports.Email = Email;
class Sentence {
    constructor(options) {
        this.options = options;
    }
    generate(provider) {
        return provider.sentence(this.options);
    }
}
exports.Sentence = Sentence;
class Word {
    constructor(options) {
        this.options = options;
    }
    generate(provider) {
        return provider.word(this.options);
    }
}
exports.Word = Word;
class Avatar {
    constructor(options) {
        this.options = options;
    }
    generate(provider) {
        return provider.avatar(this.options);
    }
}
exports.Avatar = Avatar;
class Natural {
    constructor(options) {
        this.options = options;
    }
    generate(provider) {
        return provider.natural(this.options);
    }
}
exports.Natural = Natural;
class Integer {
    constructor(options) {
        this.options = options;
    }
    generate(provider) {
        return provider.integer(this.options);
    }
}
exports.Integer = Integer;
class Bool {
    constructor(options) {
        this.options = options;
    }
    generate(provider) {
        return provider.bool(this.options);
    }
}
exports.Bool = Bool;
class GUID {
    constructor(options) {
        this.options = options;
    }
    generate(provider) {
        return provider.guid(this.options);
    }
}
exports.GUID = GUID;
class List {
    constructor(options) {
        this.options = options;
    }
    generate(provider) {
        var _a;
        return Array(((_a = this.options) === null || _a === void 0 ? void 0 : _a.many) || 10)
            .fill(null)
            .map(() => this.options.factory.generate(provider));
    }
}
exports.List = List;
class Collection {
    constructor(generator) {
        this.generator = generator;
    }
    generate(provider, options) {
        return Array(options.many || 10)
            .fill(null)
            .map(() => this.generator.generate(provider));
    }
}
exports.Collection = Collection;
class Schema {
    constructor(schema) {
        this.schema = schema;
    }
    generate(provider) {
        let record = {};
        for (const key in this.schema) {
            record[key] = this.schema[key].generate(provider);
        }
        return record;
    }
}
exports.Schema = Schema;
