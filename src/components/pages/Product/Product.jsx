import './Product.css'

const Product = () => {

    return (
        <div className="product-container">
            <div className='product-label'>Продукция</div>
            
            <div className='vodolas-container'>
                <div className='vodolas-png'></div>
                <div className='vodolas-value'> Индивидуальные дыхательные аппараты для проведения подводно-технических работ, акваланги, аппараты применяемые при борьбе за живучесть судов.</div>
                <div className='vodolas-name'>ПОДВОДНАЯ ТЕХНИКА</div>
            </div>
            
            <div className='metal-container'>
                <div className='metal-png'></div>
                <div className='metal-value'> Вентили и редукторы газовые различного назначения.</div>
                <div className='metal-name'>ТЕХНИКА <div>ОБЩЕПРОМЫШ-</div> <div>ЛЕННОГО</div> НАЗНАЧЕНИЯ</div>
            </div>
            <div className='pozar-container'>
                <div className='pozar-png'></div>
                <div className='pozar-value'> Воздушные и кислородные дыхательные аппараты для пожарных и спасателей; самоспасатели, контрольно-проверочная аппаратура.</div>
                <div className='pozar-name'>СИСТЕМЫ <div>ПОЖАРНОЙ</div> <div>ЗАЩИТЫ</div></div>
            </div>
        </div>
    )
}

export default Product;