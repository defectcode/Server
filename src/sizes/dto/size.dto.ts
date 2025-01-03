// import { IsOptional, IsString, IsArray } from 'class-validator';

// export class SizeDto {
// 	@IsString({
// 		message: 'Название обязательно'
// 	})
// 	name: string;

// 	@IsString({
// 		message: 'Значение обязательно'
// 	})
// 	value: string;

// 	@IsOptional()
// 	@IsArray({
// 		message: 'Продукты должны быть массивом строк'
// 	})
// 	@IsString({ each: true, message: 'Идентификатор продукта должен быть строкой' })
// 	productIds?: string[]; 
// }
