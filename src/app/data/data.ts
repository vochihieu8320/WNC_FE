import { Injectable } from '@angular/core';
@Injectable({
	providedIn: 'root'
})
export class Data{
    User(){
  		return [
        {
          name: "Áo Phông Xanh",
					url: "assets/images/items/1.jpg",
					price: 100
        }, 
				{ 
					name: "Áo khoác màu vàng",
					url: "assets/images/items/2.jpg",
					price: 150
				},
				{
					name: "Quần ngắn thời thượng",
					url: "assets/images/items/3.jpg",
					price: 50
				},
				{
					name: "Balo xành điệu",
					url: "assets/images/items/4.jpg",
					price: 70
				},
				{
					name: "Macbook ốp lưng",
					url: "assets/images/items/5.jpg",
					price: 20
				},
				{
					name: "Sofa giá rẽ",
					url: "assets/images/items/6.jpg",
					price: 300
				},
				{
					name: "SmartWatch giá rẻ",
					url: "assets/images/items/7.jpg",
					price: 500
				},
				{
					name: "Tai nghe Thần Thánh",
					url: "assets/images/items/9.jpg",
					price: 500
				}



    
    
   			]
    	} 
	Orders()
	{
		
	}
}

