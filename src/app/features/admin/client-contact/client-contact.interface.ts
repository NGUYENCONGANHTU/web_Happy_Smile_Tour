export interface ClientContactResDTO {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  number_of_people?: string;
  expected_date?: string;
  budget?: string;
  location?: string;
  message?: string;
  contactType: ContactType;
}

enum ContactType {
  TOUR = 'TOUR',
  VISA = 'VISA',
}
