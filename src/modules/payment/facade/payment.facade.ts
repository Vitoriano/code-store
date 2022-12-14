import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface, { PaymentInterfaceInputDto, PaymentInterfaceOutputDto } from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {

  constructor (private processPaymentUseCase: UseCaseInterface) {}

  process(input: PaymentInterfaceInputDto): Promise<PaymentInterfaceOutputDto> {
    return this.processPaymentUseCase.execute(input);
  }

}