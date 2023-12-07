export async function ProductCard (item:any) {
    
        return (
        <div>
            <img
                src={`https://orbansprings.com/${item.picture}`}
                height={300}
                width={300}
                alt={item.name}
                className='border'
            />
            <h3>{item.price}</h3>
            <h6>{item.name}</h6>
</div>
)
    
}