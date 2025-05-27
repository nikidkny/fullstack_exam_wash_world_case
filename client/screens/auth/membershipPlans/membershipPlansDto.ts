export class MembershipPlanDto {
    constructor(
        public id: number,
        public name: string,
        public is_business: boolean,
        public price: number
    ) { }
}