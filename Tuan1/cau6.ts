export class Book {
    title: string;
    author: string;
    year: number;

    constructor(title: string, author: string, year: number) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    displayBook(): void {
        console.log(`Sách: "${this.title}" - Tác giả: ${this.author} (${this.year})`);
    }
}

// In kết quả
const book1 = new Book("Lập trình TypeScript", "Nguyen Van Tan", 2024);
book1.displayBook();