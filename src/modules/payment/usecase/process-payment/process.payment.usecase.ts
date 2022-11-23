import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {
  
  constructor (
    private transactionRepository: PaymentGateway,
  ){}

  async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
    
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId
    })

   transaction.process();
   
   const perssistTransaction = await this.transactionRepository.save(transaction);

   return {
    transactionId: perssistTransaction.id.id,
    orderId: perssistTransaction.orderId,
    amount: perssistTransaction.amount,
    status: transaction.status,
    createdAt: perssistTransaction.createAt,
    updatedAt: perssistTransaction.updateAt,
   }

  }

}