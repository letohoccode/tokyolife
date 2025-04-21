import { UserForm } from "./UserForm";
interface AddressForm {
    id: number;
    street: string;
    commune: string;
    district: string;
    conscious: string;
}
export interface UserAndAddressResponse extends UserForm {
    addresses : AddressForm[]
}