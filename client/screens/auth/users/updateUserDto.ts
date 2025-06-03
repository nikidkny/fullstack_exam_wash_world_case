export class UpdateUserDto {
    constructor(
        public first_name?: string,
        public last_name?: string,
        public email?: string,
        public phone_number?: number,
        public role?: string,
        public plate_number?: string,
    ) {}
}