import type {
  CollectionTrait,
  CollectionTraitOptions,
  GeneratorTrait,
} from '../domain/generators'

export class Name implements GeneratorTrait<string> {
  constructor(private options?: Partial<Chance.NameOptions>) {}

  generate(provider: Chance.Chance): string {
    return provider.name(this.options)
  }
}

export class Paragraph implements GeneratorTrait<string> {
  constructor(private options?: Partial<Chance.Options>) {}

  generate(provider: Chance.Chance): string {
    return provider.paragraph(this.options)
  }
}

export class Email implements GeneratorTrait<string> {
  constructor(private options?: Partial<Chance.EmailOptions>) {}

  generate(provider: Chance.Chance): string {
    return provider.email(this.options)
  }
}

export class Sentence implements GeneratorTrait<string> {
  constructor(private options?: Partial<Chance.SentenceOptions>) {}

  generate(provider: Chance.Chance): string {
    return provider.sentence(this.options)
  }
}

export class Word implements GeneratorTrait<string> {
  constructor(private options?: Partial<Chance.WordOptions>) {}

  generate(provider: Chance.Chance): string {
    return provider.word(this.options)
  }
}

export class Avatar implements GeneratorTrait<string> {
  constructor(private options?: Partial<Chance.Options>) {}

  generate(provider: Chance.Chance): string {
    return provider.avatar(this.options)
  }
}

export class Natural implements GeneratorTrait<number> {
  constructor(private options?: Chance.Options) {}

  generate(provider: Chance.Chance): number {
    return provider.natural(this.options)
  }
}

export class Integer implements GeneratorTrait<number> {
  constructor(private options?: Partial<Chance.IntegerOptions>) {}

  generate(provider: Chance.Chance): number {
    return provider.integer(this.options)
  }
}

export class Bool implements GeneratorTrait<boolean> {
  constructor(private options?: { likelihood: number }) {}

  generate(provider: Chance.Chance): boolean {
    return provider.bool(this.options)
  }
}

export class GUID implements GeneratorTrait<string> {
  constructor(private options?: { version: 4 | 5 }) {}

  generate(provider: Chance.Chance): string {
    return provider.guid(this.options)
  }
}

export class List<T> implements GeneratorTrait<T[]> {
  constructor(private options: { factory: GeneratorTrait<T>; many: number }) {}
  generate(provider: Chance.Chance): T[] {
    return Array(this.options?.many || 10)
      .fill(null)
      .map(() => this.options.factory.generate(provider))
  }
}

export class Collection<T> implements CollectionTrait<T> {
  constructor(private generator: GeneratorTrait<T>) {}

  generate(provider: Chance.Chance, options: CollectionTraitOptions): T[] {
    return Array(options.many || 10)
      .fill(null)
      .map(() => this.generator.generate(provider))
  }
}

export class Schema<T extends GeneratorTrait<unknown>>
  implements GeneratorTrait<Record<string, unknown>>
{
  constructor(private schema: Record<string, T>) {}

  generate(provider: Chance.Chance): Record<string, unknown> {
    let record = {} as Record<string, unknown>

    for (const key in this.schema) {
      record[key] = this.schema[key].generate(provider)
    }

    return record
  }
}
