export interface IEssence {
    id: number | undefined, //число, обязательный идентификатор - выдается автоматически при сохранении
    title?: string, // строка, не более 50 символов
    description?: string, // markdown произвольного размера
    published: boolean, // обязательное поле
    published_from?: string | null // nullable дата
}