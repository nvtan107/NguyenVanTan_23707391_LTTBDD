import { Book } from "./cau6";
import { User } from "./cau7";

export class Library {
    books: Book[] = [];
    users: User[] = [];

    addBook(book: Book): void {
        this.books.push(book);
        console.log(`Đã thêm sách: ${book.title}`);
    }

    addUser(user: User): void {
        this.users.push(user);
        console.log(`Đã thêm bạn đọc: ${user.name}`);
    }

    displayLibrary(): void {
        console.log(`Thư viện có ${this.books.length} cuốn sách và ${this.users.length} bạn đọc.`);
    }
}

// In kết quả
const lib = new Library();
lib.addBook(new Book("Lập trình TypeScript", "Nguyen Van Tan", 2024));
lib.addUser(new User("Tan"));
lib.displayLibrary();