'use client';
import { useState } from 'react';

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [orderType, setOrderType] = useState('dine-in'); // 'dine-in' للمحل أو 'delivery' للدلفري
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [cart, setCart] = useState([]);

  // إضافة صنف للسلة
  const addToCart = (item, size = null, priceStr = '') => {
    // استخراج رقم السعر من النص (مثل "200 ج" تحول إلى رقم 200)
    const numericPrice = parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
    
    const existingIndex = cart.findIndex(c => c.name === item && c.size === size);
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { name: item, size, price: priceStr, numericPrice, quantity: 1 }]);
    }
  };

  // تقليل أو حذف صنف من السلة
  const removeFromCart = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  // حساب المجموع الكلي للمنتجات
  const itemsSubtotal = cart.reduce((acc, item) => acc + (item.numericPrice * item.quantity), 0);
  const totalAmount = itemsSubtotal;

  // إرسال الطلب للواتساب بالرقم الجديد وتفاصيل الحساب
  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) {
      alert('الرجاء اختيار أصناف أولاً قبل إتمام الطلب!');
      return;
    }

    const phone = "201012061304";
    const typeText = orderType === 'dine-in' ? 'تناول بالمحل (صالة) 🍽️' : 'دلفري (توصيل) 🛵';
    
    let text = `مرحباً، أرغب في إتمام طلب جديد:\n`;
    text += `- نوع الطلب: *${typeText}*\n`;
    if (customerName) text += `- اسم العميل: *${customerName}*\n`;
    if (orderType === 'delivery' && customerAddress) text += `- عنوان التوصيل: *${customerAddress}*\n`;
    
    text += `\n*قائمة الطلبات:*\n`;
    cart.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name} ${item.size ? `(${item.size})` : ''} - السعر: ${item.price} - الكمية: (${item.quantity})\n`;
    });

    text += `\n------------------\n`;
    text += `💰 مجموع الطلبات: *${itemsSubtotal} ج*\n`;
    if (orderType === 'delivery') {
      text += `🛵 مصاريف الشحن: *${deliveryFee} ج*\n`;
    }
    text += `🎯 الإجمالي النهائي: *${totalAmount} ج*\n`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // قائمة الأصناف الكاملة بناءً على المنيو المستخرج من الصور
  const menuCategories = {
    pizza: [
      { name: 'بيتزا مشكل لحوم تيم', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60', prices: { صغير: '200 ج', وسط: '220 ج', عائلي: '345 ج', جامبو: '455 ج' } },
      { name: 'بيتزا هوت دوج', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60', prices: { صغير: '200 ج', وسط: '220 ج', عائلي: '345 ج', جامبو: '485 ج' } },
      { name: 'بيتزا فراخ', img: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=500&auto=format&fit=crop&q=60', prices: { صغير: '200 ج', وسط: '220 ج', عائلي: '345 ج', جامبو: '485 ج' } },
      { name: 'بيتزا ميكس جبن', img: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=500&auto=format&fit=crop&q=60', prices: { صغير: '160 ج', وسط: '180 ج', عائلي: '295 ج', جامبو: '375 ج' } },
      { name: 'بيتزا أقاشي', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=60', prices: { صغير: '210 ج', وسط: '240 ج', عائلي: '360 ج', جامبو: '495 ج' } },
    ],
    savory: [
      { name: 'فطيرة مشكل لحوم تيم', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60', prices: { صغير: '200 ج', وسط: '220 ج', عائلي: '345 ج', جامبو: '455 ج' } },
      { name: 'فطيرة هوت دوج', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60', prices: { صغير: '200 ج', وسط: '220 ج', عائلي: '345 ج', جامبو: '485 ج' } },
      { name: 'فطيرة فراخ', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=60', prices: { صغير: '200 ج', وسط: '200 ج', عائلي: '345 ج', جامبو: '485 ج' } },
      { name: 'فطيرة ميكس جين', img: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=500&auto=format&fit=crop&q=60', prices: { صغير: '160 ج', وسط: '180 ج', عائلي: '295 ج', جامبو: '375 ج' } },
    ],
    sweet: [
      { name: 'فطيرة تيم', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=500&auto=format&fit=crop&q=60', prices: { كبير: '190 ج', عائلي: '270 ج' } },
      { name: 'فطيرة قشطة', img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60', prices: { كبير: '185 ج', عائلي: '250 ج' } },
      { name: 'فطيرة شوكولاتة', img: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=500&auto=format&fit=crop&q=60', prices: { كبير: '185 ج', عائلي: '250 ج' } },
    ],
    sandwiches: [
      { name: 'شاورما فراخ', img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&auto=format&fit=crop&q=60', prices: { سوري: '90 ج', فرنساوي: '100 ج' } },
      { name: 'شاورما لحمة', img: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60', prices: { سوري: '100 ج', فرنساوي: '110 ج' } },
      { name: 'اقاشي فراخ', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=60', prices: { سوري: '90 ج', فرنساوي: '100 ج' } },
      { name: 'اقاشي لحمة', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60', prices: { سوري: '100 ج', فرنساوي: '110 ج' } },
      { name: 'كرسبي', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60', prices: { سوري: '90 ج', فرنساوي: '100 ج' } },
      { name: 'شيش طاووق', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=60', prices: { سوري: '100 ج', فرنساوي: '110 ج' } },
      { name: 'بيرقر', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', prices: { 'عادي': 100 } },

    ],
    mojito: [
      { name: 'موهيتو توت / فراولة / مانجو', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60', price: '75 ج' },
      { name: 'موهيتو كرز / خوخ / تفاح أخضر', img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60', price: '75 ج' },
      { name: 'موهيتو أناناس / باشون / كيوي', img: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500&auto=format&fit=crop&q=60', price: '75 ج' },
      { name: 'موهيتو ليمون نعناع / كلاسيك', img: 'https://images.unsplash.com/photo-154165801642c-aa5509ba90f9?w=500&auto=format&fit=crop&q=60', price: '75 ج' },
    ],
    icecoffee: [
      { name: 'إيس كاراميل / موكا / لاتي / فرابي', img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60', price: '90 ج' },
    ],
    hotdrinks: [
      { name: 'هوت شوكليت / نسكافي / كابتشينو / لاتي', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=60', price: '70 ج' },
      { name: 'شاي حليب / قهوة تركي / سودانية / نكهات', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60', price: '50 ج' },
    ],
    juices: [
      { name: 'عصائر طبيعية (مانجو، فراولة، جوافة، موز، برتقال، ليمون نعناع)', img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=60', price: '85 ج' },
      { name: 'عصائر سودانية (تبلدي، عرديب، كركدي)', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&auto=format&fit=crop&q=60', price: '70 ج' },
    ],
    slush: [
      { name: 'سلاش (فراولة، مانجو، بلو راسبري، ليمون نعناع)', img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60', price: '75 ج' },
    ],
    drinks: [
      { name: 'مشروبات غازية', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60', price: '25 ج' },
      { name: 'مياه معدنية', img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&auto=format&fit=crop&q=60', price: '20 ج' },
    ]
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-40">
      {/* Header */}
      <header className="relative bg-gradient-to-b from-amber-900/40 via-neutral-900 to-neutral-950 pt-12 pb-8 px-4 text-center border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto">
          <span className="text-amber-400 tracking-widest uppercase text-sm font-semibold">طازجة . ساخنة . بطريقتنا</span>
          <h1 className="text-4xl md:text-6xl font-black mt-2 mb-3 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-200">
            مطعم & كافي تيم الزين
          </h1>
          <p className="text-amber-200/80 italic text-lg">"طعم مختلف.. مزاجك علينا"</p>
          
          <div className="mt-4 text-xs md:text-sm text-neutral-400 bg-neutral-900/80 inline-block px-4 py-2 rounded-full border border-neutral-800">
            📍 داخل / تمم الزين - 193 شارع السودان - المهندسين
          </div>
        </div>
      </header>

      {/* Order Type Selector */}
      <section className="max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="text-sm font-bold text-amber-400">حدد طريقة الطلب أولاً:</div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setOrderType('dine-in')}
              className={`flex-1 md:flex-none px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition ${
                orderType === 'dine-in' ? 'bg-amber-500 text-neutral-950 shadow-md' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              🍽️ أكل بالمحل (صالة)
            </button>
            <button
              onClick={() => setOrderType('delivery')}
              className={`flex-1 md:flex-none px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition ${
                orderType === 'delivery' ? 'bg-amber-500 text-neutral-950 shadow-md' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              🛵 دلفري (توصيل)
            </button>
          </div>
        </div>

        {orderType === 'delivery' && (
          <div className="mt-3 bg-neutral-900/80 border border-neutral-800 p-3 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <input 
              type="text" 
              placeholder="اكتب اسمك الكريم هنا..." 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-neutral-200 focus:outline-none focus:border-amber-500"
            />
            <input 
              type="text" 
              placeholder="اكتب عنوان التوصيل بالتفصيل..." 
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 p-2.5 rounded-lg text-neutral-200 focus:outline-none focus:border-amber-500"
            />
          </div>
        )}
      </section>

      {/* Navigation Tabs */}
      <nav className="sticky top-0 z-45 bg-neutral-900/95 backdrop-blur border-y border-neutral-800 py-3 px-4 overflow-x-auto mt-6">
        <div className="max-w-4xl mx-auto flex gap-2 justify-start md:justify-center min-w-max">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'pizza', label: '🍕 بيتزا' },
            { id: 'savory', label: '🥧 فطائر مالحة' },
            { id: 'sweet', label: '🥞 فطائر حلوة' },
            { id: 'sandwiches', label: '🥪 سندوتشات' },
            { id: 'mojito', label: '🍹 موهيتو' },
            { id: 'icecoffee', label: '☕ إيس كوفي' },
            { id: 'hotdrinks', label: '🍵 ساخنة' },
            { id: 'juices', label: '🧃 عصائر' },
            { id: 'slush', label: '🍧 سلاش' },
            { id: 'drinks', label: '🥤 غازية ومياه' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-amber-500 text-neutral-950 font-bold shadow-lg' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Menu Container */}
      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-10">

        {/* 1. Pizza */}
        {(activeTab === 'all' || activeTab === 'pizza') && (
          <section className="bg-neutral-900/60 rounded-2xl p-5 border border-neutral-800">
            <h2 className="text-xl font-bold text-amber-400 mb-6 border-b border-neutral-800 pb-2">🍕 قسم البيتزا</h2>
            <div className="grid gap-6">
              {menuCategories.pizza.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center bg-neutral-950/60 p-4 rounded-xl border border-neutral-800 gap-4">
                  <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-lg border border-neutral-800" />
                  <div className="flex-1 text-center sm:text-right">
                    <h3 className="font-bold text-lg text-neutral-100">{item.name}</h3>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                    {Object.entries(item.prices).map(([size, price]) => (
                      <div key={size} className="flex flex-col items-center bg-neutral-900 px-2.5 py-1.5 rounded-lg border border-neutral-800">
                        <span className="text-neutral-400 text-[10px]">{size}</span>
                        <span className="text-amber-400 font-bold">{price}</span>
                        <button
                          onClick={() => addToCart(item.name, size, price)}
                          className="mt-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-neutral-950 text-[10px] px-2 py-0.5 rounded transition font-bold"
                        >
                          + أضف
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2. Savory Pies */}
        {(activeTab === 'all' || activeTab === 'savory') && (
          <section className="bg-neutral-900/60 rounded-2xl p-5 border border-neutral-800">
            <h2 className="text-xl font-bold text-amber-400 mb-6 border-b border-neutral-800 pb-2">🥧 فطائر مالحة</h2>
            <div className="grid gap-6">
              {menuCategories.savory.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center bg-neutral-950/60 p-4 rounded-xl border border-neutral-800 gap-4">
                  <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-lg border border-neutral-800" />
                  <div className="flex-1 text-center sm:text-right">
                    <h3 className="font-bold text-lg text-neutral-100">{item.name}</h3>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                    {Object.entries(item.prices).map(([size, price]) => (
                      <div key={size} className="flex flex-col items-center bg-neutral-900 px-2.5 py-1.5 rounded-lg border border-neutral-800">
                        <span className="text-neutral-400 text-[10px]">{size}</span>
                        <span className="text-amber-400 font-bold">{price}</span>
                        <button
                          onClick={() => addToCart(item.name, size, price)}
                          className="mt-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-neutral-950 text-[10px] px-2 py-0.5 rounded transition font-bold"
                        >
                          + أضف
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. Sweet Pies */}
        {(activeTab === 'all' || activeTab === 'sweet') && (
          <section className="bg-neutral-900/60 rounded-2xl p-5 border border-neutral-800">
            <h2 className="text-xl font-bold text-amber-400 mb-6 border-b border-neutral-800 pb-2">🥞 فطائر حلوة</h2>
            <div className="grid gap-6">
              {menuCategories.sweet.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center bg-neutral-950/60 p-4 rounded-xl border border-neutral-800 gap-4">
                  <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-lg border border-neutral-800" />
                  <div className="flex-1 text-center sm:text-right">
                    <h3 className="font-bold text-lg text-neutral-100">{item.name}</h3>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                    {Object.entries(item.prices).map(([size, price]) => (
                      <div key={size} className="flex flex-col items-center bg-neutral-900 px-2.5 py-1.5 rounded-lg border border-neutral-800">
                        <span className="text-neutral-400 text-[10px]">{size}</span>
                        <span className="text-amber-400 font-bold">{price}</span>
                        <button
                          onClick={() => addToCart(item.name, size, price)}
                          className="mt-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-neutral-950 text-[10px] px-2 py-0.5 rounded transition font-bold"
                        >
                          + أضف
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Sandwiches */}
        {(activeTab === 'all' || activeTab === 'sandwiches') && (
          <section className="bg-neutral-900/60 rounded-2xl p-5 border border-neutral-800">
            <h2 className="text-xl font-bold text-amber-400 mb-6 border-b border-neutral-800 pb-2">🥪 سندوتشات (سوري / فرنساوي)</h2>
            <div className="grid gap-6">
              {menuCategories.sandwiches.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center bg-neutral-950/60 p-4 rounded-xl border border-neutral-800 gap-4">
                  <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-lg border border-neutral-800" />
                  <div className="flex-1 text-center sm:text-right">
                    <h3 className="font-bold text-lg text-neutral-100">{item.name}</h3>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                    {Object.entries(item.prices).map(([size, price]) => (
                      <div key={size} className="flex flex-col items-center bg-neutral-900 px-2.5 py-1.5 rounded-lg border border-neutral-800">
                        <span className="text-neutral-400 text-[10px]">{size}</span>
                        <span className="text-amber-400 font-bold">{price}</span>
                        <button
                          onClick={() => addToCart(item.name, size, price)}
                          className="mt-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-neutral-950 text-[10px] px-2 py-0.5 rounded transition font-bold"
                        >
                          + أضف
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Drinks Sections (Mojito, Ice Coffee, Hot Drinks, Juices, Slush, Drinks) */}
        {['mojito', 'icecoffee', 'hotdrinks', 'juices', 'slush', 'drinks'].map((catKey) => {
          if (activeTab !== 'all' && activeTab !== catKey) return null;
          const titles = { 
            mojito: '🍹 موهيتو', 
            icecoffee: '☕ إيس كوفي', 
            hotdrinks: '🍵 مشروبات ساخنة', 
            juices: '🧃 عصائر طبيعية وسودانية', 
            slush: '🍧 سلاش', 
            drinks: '🥤 مشروبات غازية ومياه' 
          };
          
          return (
            <section key={catKey} className="bg-neutral-900/60 rounded-2xl p-5 border border-neutral-800">
              <h2 className="text-xl font-bold text-amber-400 mb-6 border-b border-neutral-800 pb-2">{titles[catKey]}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {menuCategories[catKey].map((item, idx) => (
                  <div key={idx} className="flex items-center bg-neutral-950/60 p-3 rounded-xl border border-neutral-800 gap-3">
                    <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-neutral-800" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-neutral-200">{item.name}</h3>
                      <span className="text-amber-400 font-bold text-sm">{item.price}</span>
                    </div>
                    <button
                      onClick={() => addToCart(item.name, null, item.price)}
                      className="bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-neutral-950 text-xs px-3 py-1.5 rounded-lg transition font-bold"
                    >
                      + أضف
                    </button>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

      </div>

      {/* Floating Cart & Sum Summary Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900/95 backdrop-blur border-t border-amber-500/30 p-4 shadow-2xl">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          
          {/* Cart Items view */}
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 border-b border-neutral-800">
            <span className="bg-amber-500 text-neutral-950 font-black px-3 py-1 rounded-full text-xs shrink-0">
              السلة ({cart.reduce((acc, item) => acc + item.quantity, 0)})
            </span>
            {cart.length === 0 ? (
              <span className="text-neutral-400 text-xs">لم تقم باختيار أي صنف بعد...</span>
            ) : (
              <div className="flex gap-2 overflow-x-auto">
                {cart.map((c, i) => (
                  <div key={i} className="bg-neutral-950 border border-neutral-800 px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5 shrink-0">
                    <span className="text-neutral-200">{c.name} {c.size ? `(${c.size})` : ''}</span>
                    <span className="text-amber-400 font-bold">x{c.quantity}</span>
                    <span className="text-neutral-400">({parseInt(c.numericPrice) * c.quantity} ج)</span>
                    <button onClick={() => removeFromCart(i)} className="text-red-400 hover:text-red-300 ml-1 font-bold">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sum / Total Calculation & Checkout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm">
            <div className="flex flex-wrap items-center gap-4 text-neutral-300">
              <span>المجموع: <strong className="text-amber-400">{itemsSubtotal} ج</strong></span>
              {orderType === 'delivery' && (
                <span>+ مصاريف الشحن: <strong className="text-amber-400">{deliveryFee} ج</strong></span>
              )}
              <span className="bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-lg">
                الإجمالي النهائي: <strong className="text-amber-400 text-base">{totalAmount} ج</strong>
              </span>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2 shrink-0"
            >
              <span>💬 إرسال الطلب عبر الواتساب</span>
            </button>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 mt-16 text-center text-xs text-neutral-500 border-t border-neutral-900 pt-6">
        <p>مطعم & كافي تيم الزين © 2026 - جميع الحقوق محفوظة</p>
      </footer>
    </main>
  );
}
