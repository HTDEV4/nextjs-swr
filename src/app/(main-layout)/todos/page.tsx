import SearchForm from "./_components/SearchForm";
import TodoList from "./_components/TodoList";

export default function TodoPage() {
    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Todo List</h1>
            <SearchForm />
            <TodoList />
        </div>
    );
}
