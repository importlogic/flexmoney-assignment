const Card = ({ children }) => {
    return (
        <div className='h-[500px] w-[350px] md:w-[800px] rounded-xl bg-white p-4 shadow-2xl'>
            {children}
        </div>
    );
};

export default Card;
