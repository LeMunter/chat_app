const Searchbar: React.FC = () => {
    return (
        <div className="search flex-2 pb-6 px-2">
            <input
                type="text"
                className="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200"
                placeholder="Search"
            />
        </div>
    );
};

export default Searchbar;
