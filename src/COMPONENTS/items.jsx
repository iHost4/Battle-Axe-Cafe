import '../CSS/items.css'
        /*the container should have
        1. Image
        2. Description
        3. Quantity 
        */
function Items({image, imageAlt, desc, options=[]}){
    return(
        <div id="itemContainer">
            <img id="itemImage" src={image} alt={imageAlt}></img>
            <div className='detailOption'>
                <p>{desc}</p>
                <select>
                    {options.map((opt, i) =>(
                        <option key={i} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Items;