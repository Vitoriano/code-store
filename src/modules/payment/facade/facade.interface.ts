export interface PaymentInterfaceInputDto {
  orderId: string;
  amount: number;
}

export interface PaymentInterfaceOutputDto {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default interface PaymentFacadeInterface {
  process(input: PaymentInterfaceInputDto): Promise<PaymentInterfaceOutputDto>;
}