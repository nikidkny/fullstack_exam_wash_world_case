export class UserDto {
    constructor(
        public id: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        public password: string,
        public phone_number: number,
        public plate_number: string,
        public membership_plan_id: number,
    ) {}
}