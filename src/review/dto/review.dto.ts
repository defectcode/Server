import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";


export class ReviewDto {
    @IsString({
        message: 'The review text must be plain'
    })
    @IsNotEmpty({ message: 'The text of the review is mandatory' })
    text: string

    @IsNumber({}, { message: 'The rating must be a number'})
    @Min(1, { message: 'Minimum rating - 1' })
    @Max(5, { message: 'Maximum rating -5' })
    @IsNotEmpty({ message: 'The rating is mandatory' })
    rating: number
}