/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace sap {
    namespace byd {
        namespace querysalesorderin {
            interface SalesOrderByElementsQuery_sync extends SalesOrderByElementsQueryMessage_sync {
            }

            interface SalesOrderByElementsResponse_sync extends SalesOrderByElementsResponseMessage_sync {
            }

            interface ExchangeFaultData {
                faultText: string;
                faultUrl?: string;
                faultDetail?: ExchangeLogData[];
            }

            interface ExchangeLogData {
                severity?: string;
                text: string;
                url?: string;
                id?: string;
            }

            type LEN120_LANGUAGEINDEPENDENT_Text = string;

            interface ProductKey {
                ProductTypeCode: ProductTypeCode;
                ProductIdentifierTypeCode: ProductIdentifierTypeCode;
                ProductID: ProductID;
            }

            interface ProjectTaskKey {
                TaskID: ProjectElementID;
            }

            interface RequirementSpecificationKey {
                RequirementSpecificationID: RequirementSpecificationID;
                RequirementSpecificationVersionID?: VersionID;
            }

            interface StandardFaultMessageExtension {
                Log?: Log;
            }

            interface StandardFaultMessage {
            }

            interface SalesOrderByElementsQueryMessage_sync {
                SalesOrderSelectionByElements?: SalesOrderByElementsQuerySelectionByElements;
                ProcessingConditions?: QueryProcessingConditions;
                RequestedElements?: SalesOrderByElementsQueryRequestedElements;
            }

            interface SalesOrderByElementsQueryRequestedElements {
                SalesOrder?: SalesOrderByElementsQueryRequestedElementsSalesOrder;
                $salesOrderTransmissionRequestCode?: TransmissionRequestCode;
            }

            type SalesOrderByElementsQueryRequestedElementsSalesOrder = string | { Content: string, $itemTransmissionRequestCode?: TransmissionRequestCode, $salesAndServiceBusinessAreaTransmissionRequestCode?: TransmissionRequestCode, $billToPartyTransmissionRequestCode?: TransmissionRequestCode, $accountPartyTransmissionRequestCode?: TransmissionRequestCode, $payerPartyTransmissionRequestCode?: TransmissionRequestCode, $productRecipientPartyTransmissionRequestCode?: TransmissionRequestCode, $salesPartnerPartyTransmissionRequestCode?: TransmissionRequestCode, $freightForwarderPartyTransmissionRequestCode?: TransmissionRequestCode, $employeeResponsiblePartyTransmissionRequestCode?: TransmissionRequestCode, $sellerPartyTransmissionRequestCode?: TransmissionRequestCode, $salesUnitPartyTransmissionRequestCode?: TransmissionRequestCode, $serviceExecutionTeamPartyTransmissionRequestCode?: TransmissionRequestCode, $servicePerformerPartyTransmissionRequestCode?: TransmissionRequestCode, $salesEmployerPartyTransmissionRequestCode?: TransmissionRequestCode, $billFromPartyTransmissionRequestCode?: TransmissionRequestCode, $requestedFulfillmentPeriodPeriodTerms?: TransmissionRequestCode, $deliveryTermsTransmissionRequestCode?: TransmissionRequestCode, $pricingTermsTransmissionRequestCode?: TransmissionRequestCode, $salesTermsTransmissionRequestCode?: TransmissionRequestCode, $invoiceTermsTransmissionRequestCode?: TransmissionRequestCode, $cashDiscountTermsTransmissionRequestCode?: TransmissionRequestCode, $paymentControlTransmissionRequestCode?: TransmissionRequestCode, $priceAndTaxCalculationTransmissionRequestCode?: TransmissionRequestCode, $textCollectionTransmissionRequestCode?: TransmissionRequestCode, $attachmentFolderTransmissionRequestCode?: TransmissionRequestCode };

            interface SalesOrderByElementsQuerySelectionByApprovalStatusCode {
                InclusionExclusionCode?: InclusionExclusionCode;
                IntervalBoundaryTypeCode: IntervalBoundaryTypeCode;
                LowerBoundaryApprovalStatusCode?: ApprovalStatusCode;
                UpperBoundaryApprovalStatusCode?: ApprovalStatusCode;
            }

            interface SalesOrderByElementsQuerySelectionByDataOriginTypeCode {
                InclusionExclusionCode?: InclusionExclusionCode;
                IntervalBoundaryTypeCode: IntervalBoundaryTypeCode;
                LowerBoundaryDataOriginTypeCode?: CustomerTransactionDocumentDataOriginTypeCode;
                UpperBoundaryDataOriginTypeCode?: CustomerTransactionDocumentDataOriginTypeCode;
            }

            interface SalesOrderByElementsQuerySelectionByDateTime {
                InclusionExclusionCode?: InclusionExclusionCode;
                IntervalBoundaryTypeCode: IntervalBoundaryTypeCode;
                LowerBoundaryDateTime?: GLOBAL_DateTime;
                UpperBoundaryDateTime?: GLOBAL_DateTime;
            }

            interface SalesOrderByElementsQuerySelectionByDistributionChannelCode {
                InclusionExclusionCode?: InclusionExclusionCode;
                IntervalBoundaryTypeCode?: IntervalBoundaryTypeCode;
                LowerBoundarySalesAndServiceBusinessAreaDistributionChannelCode: DistributionChannelCode;
                UpperBoundarySalesAndServiceBusinessAreaDistributionChannelCode?: DistributionChannelCode;
            }

            interface SalesOrderByElementsQuerySelectionByElements {
                SelectionByID?: SalesOrderByElementsQuerySelectionByID[];
                SelectionByBuyerPartyID?: SalesOrderByElementsQuerySelectionByPartyID[];
                SelectionByItemListCustomerOrderLifeCycleStatusCode?: SalesOrderByElementsQuerySelectionByStatusItemListCustomerOrderLifeCycleStatusCode[];
                SelectionByName?: SalesOrderByElementsQuerySelectionByName[];
                SelectionByBuyerID?: SalesOrderByElementsQuerySelectionByID[];
                SelectionByPostingDate?: SalesOrderByElementsQuerySelectionByDateTime[];
                SelectionByDataOriginTypeCode?: SalesOrderByElementsQuerySelectionByDataOriginTypeCode[];
                SelectionByItemListExecutionReleaseStatusCode?: SalesOrderByElementsQuerySelectionByReleaseStatusCode[];
                SelectionByApprovalStatusCode?: SalesOrderByElementsQuerySelectionByApprovalStatusCode[];
                SelectionByEmployeeResponsiblePartyID?: SalesOrderByElementsQuerySelectionByPartyID[];
                SelectionBySalesUnitPartyID?: SalesOrderByElementsQuerySelectionByPartyID[];
                SelectionBySalesAndServiceBusinessAreaSalesOrganisationID?: SalesOrderByElementsQuerySelectionByOrganisationalCentreID[];
                SelectionBySalesAndServiceBusinessAreaDistributionChannelCode?: SalesOrderByElementsQuerySelectionByDistributionChannelCode[];
                SelectionByServicePerformerPartyID?: SalesOrderByElementsQuerySelectionByPartyID[];
                SelectionByServiceExecutionTeamPartyID?: SalesOrderByElementsQuerySelectionByPartyID[];
                SelectionByProductID?: SalesOrderByElementsQuerySelectionByProductID[];
                SelectionByProductRequirementSpecificationID?: SalesOrderByElementsQuerySelectionByProductRequirementSpecificationKeyRequirementSpecificationID[];
                SelectionByLastChangedDate?: SalesOrderByElementsQuerySelectionByDateTime[];
            }

            interface SalesOrderByElementsQuerySelectionByID {
                InclusionExclusionCode?: InclusionExclusionCode;
                IntervalBoundaryTypeCode: IntervalBoundaryTypeCode;
                LowerBoundaryID?: BusinessTransactionDocumentID;
                UpperBoundaryID?: BusinessTransactionDocumentID;
            }

            interface SalesOrderByElementsQuerySelectionByName {
                InclusionExclusionCode?: InclusionExclusionCode;
                IntervalBoundaryTypeCode: IntervalBoundaryTypeCode;
                LowerBoundaryName?: MEDIUM_Name;
                UpperBoundaryName?: MEDIUM_Name;
            }

            interface SalesOrderByElementsQuerySelectionByOrganisationalCentreID {
                InclusionExclusionCode?: InclusionExclusionCode;
                IntervalBoundaryTypeCode: IntervalBoundaryTypeCode;
                LowerBoundaryOrganisationalCentreID?: OrganisationalCentreID;
                UpperBoundaryOrganisationalCentreID?: OrganisationalCentreID;
            }

            interface SalesOrderByElementsQuerySelectionByPartyID {
                InclusionExclusionCode?: InclusionExclusionCode;
                IntervalBoundaryTypeCode: IntervalBoundaryTypeCode;
                LowerBoundaryPartyID?: PartyID;
                UpperBoundaryPartyID?: PartyID;
            }

            interface SalesOrderByElementsQuerySelectionByProductID {
                InclusionExclusionCode?: InclusionExclusionCode;
                IntervalBoundaryTypeCode: IntervalBoundaryTypeCode;
                LowerBoundaryProductID?: NOCONVERSION_ProductID;
                UpperBoundaryProductID?: NOCONVERSION_ProductID;
            }

            interface SalesOrderByElementsQuerySelectionByProductRequirementSpecificationKeyRequirementSpecificationID {
                InclusionExclusionCode?: InclusionExclusionCode;
                IntervalBoundaryTypeCode: IntervalBoundaryTypeCode;
                LowerBoundaryRequirementSpecificationID?: RequirementSpecificationID;
                UpperBoundaryRequirementSpecificationID?: RequirementSpecificationID;
            }

            interface SalesOrderByElementsQuerySelectionByReleaseStatusCode {
                InclusionExclusionCode?: InclusionExclusionCode;
                IntervalBoundaryTypeCode: IntervalBoundaryTypeCode;
                LowerBoundaryReleaseStatusCode?: ReleaseStatusCode;
                UpperBoundaryReleaseStatusCode?: ReleaseStatusCode;
            }

            interface SalesOrderByElementsQuerySelectionByStatusItemListCustomerOrderLifeCycleStatusCode {
                InclusionExclusionCode?: InclusionExclusionCode;
                IntervalBoundaryTypeCode: IntervalBoundaryTypeCode;
                LowerBoundaryItemListCustomerOrderLifeCycleStatusCode?: CustomerOrderLifeCycleStatusCode;
                UpperBoundaryItemListCustomerOrderLifeCycleStatusCode?: CustomerOrderLifeCycleStatusCode;
            }

            interface SalesOrderByElementsResponse {
                ID?: BusinessTransactionDocumentID;
                UUID?: UUID;
                BuyerID?: BusinessTransactionDocumentID;
                PostingDate?: GLOBAL_DateTime;
                Name?: EXTENDED_Name;
                ChangeStateID?: ChangeStateID;
                DataOriginTypeCode?: CustomerTransactionDocumentDataOriginTypeCode;
                FulfillmentBlockingReasonCode?: CustomerTransactionDocumentFulfilmentBlockingReasonCode;
                ServiceConfirmationCreationCode?: CustomerTransactionDocumentServiceConfirmationCreationCode;
                Status?: SalesOrderByElementsResponseStatus;
                BusinessTransactionDocumentReference?: SalesOrderByElementsResponseBusinessTransactionDocumentReference[];
                SalesAndServiceBusinessArea?: SalesOrderByElementsResponseSalesAndServiceBusinessArea;
                BillToParty?: SalesOrderByElementsResponseParty;
                AccountParty?: SalesOrderByElementsResponseParty;
                PayerParty?: SalesOrderByElementsResponseParty;
                ProductRecipientParty?: SalesOrderByElementsResponseParty;
                SalesPartnerParty?: SalesOrderByElementsResponseParty;
                FreightForwarderParty?: SalesOrderByElementsResponseParty;
                EmployeeResponsibleParty?: SalesOrderByElementsResponseParty;
                SellerParty?: SalesOrderByElementsResponseParty;
                SalesUnitParty?: SalesOrderByElementsResponseParty;
                ServiceExecutionTeamParty?: SalesOrderByElementsResponseParty;
                ServicePerformerParty?: SalesOrderByElementsResponseParty;
                SalesEmployeeParty?: SalesOrderByElementsResponseParty;
                BillFromParty?: SalesOrderByElementsResponseParty;
                RequestedFulfillmentPeriodPeriodTerms?: SalesOrderByElementsResponseRequestedFulfillmentPeriodPeriodTerms;
                DeliveryTerms?: SalesOrderByElementsResponseDeliveryTerms;
                PricingTerms?: SalesOrderByElementsResponsePricingTerms;
                SalesTerms?: SalesOrderByElementsResponseSalesTerms;
                InvoiceTerms?: SalesOrderByElementsResponseInvoiceTerms;
                Item?: SalesOrderByElementsResponseItem[];
                CashDiscountTerms?: SalesOrderByElementsResponseCashDiscountTerms;
                PaymentControl?: SalesOrderByElementsResponsePaymentControl;
                PriceAndTaxCalculation?: SalesOrderByElementsResponsePriceAndTaxCalculation;
                TextCollection?: SalesOrderByElementsResponseTextCollection;
                AttachmentFolder?: AccessAttachmentFolder;
                CroatiaBusinessSpaceID?: GLOBusinessSpaceID;
                CroatiaBillingMachineID?: HR_BillingMachineID;
                CroatiaPaymentMethodCode?: CroatiaPaymentMethodCode;
                CroatiaPartyTaxID?: PartyTaxID;
                CroatiaParagonBillMark?: LANGUAGEINDEPENDENT_Text;
                CroatiaSpecialNote?: LANGUAGEINDEPENDENT_Text;
            }

            interface SalesOrderByElementsResponseBusinessTransactionDocumentReference {
                BusinessTransactionDocumentReference: BusinessTransactionDocumentReference;
                BusinessTransactionDocumentRelationshipRoleCode?: BusinessTransactionDocumentRelationshipRoleCode;
                DataProviderIndicator?: Indicator;
            }

            interface SalesOrderByElementsResponseCashDiscountTerms {
                Code?: CashDiscountTermsCode;
                PaymentBaselineDate?: Date;
            }

            interface SalesOrderByElementsResponseDeliveryTerms {
                DeliveryPriorityCode?: PriorityCode;
                Incoterms?: Incoterms;
                PartialDeliveryControlCode?: PartialDeliveryControlCode;
                CompleteDeliveryRequestedIndicator?: Indicator;
            }

            interface SalesOrderByElementsResponseInvoiceTerms {
                ProposedInvoiceDate?: Date;
                InvoicingBlockingReasonCode?: InvoicingBlockingReasonCode;
            }

            interface SalesOrderByElementsResponseItem {
                ID?: BusinessTransactionDocumentItemID;
                BuyerID?: BusinessTransactionDocumentItemID;
                ProcessingTypeCode?: BusinessTransactionDocumentItemProcessingTypeCode;
                PostingDate?: GLOBAL_DateTime;
                Description?: SHORT_Description;
                FulfilmentPartyCategoryCode?: FulfilmentPartyCategoryCode;
                Status?: SalesOrderByElementsResponseItemStatus;
                ItemBusinessTransactionDocumentReference?: SalesOrderByElementsResponseBusinessTransactionDocumentReference[];
                ItemProduct?: SalesOrderByElementsResponseItemProduct;
                ItemDeliveryTerms?: SalesOrderByElementsResponseItemDeliveryTerms;
                ItemSalesTerms?: SalesOrderByElementsResponseItemSalesTerms;
                ItemServiceTerms?: SalesOrderByElementsResponseItemServiceTerms;
                ItemScheduleLine?: SalesOrderByElementsResponseItemScheduleLine[];
                ProductRecipientItemParty?: SalesOrderByElementsResponseParty;
                VendorItemParty?: SalesOrderByElementsResponseParty;
                ServicePerformerItemParty?: SalesOrderByElementsResponseParty;
                ShipFromItemLocation?: SalesOrderByElementsResponseItemLocation;
                ItemAccountingCodingBlockDistribution?: SalesOrderByElementsResponseItemAccountingCodingBlockDistribution;
                ItemAttachmentFolder?: AccessAttachmentFolder;
                ItemTextCollection?: SalesOrderByElementsResponseTextCollection;
                PriceAndTaxCalculationItem?: SalesOrderByElementsResponsePriceAndTaxCalculationItem;
                ParentID?: BusinessTransactionDocumentItemID;
            }

            interface SalesOrderByElementsResponseItemAccountingCodingBlockDistribution {
                AccountingCodingBlockAssignmentProjectTaskKey?: ProjectTaskKey;
            }

            interface SalesOrderByElementsResponseItemDeliveryTerms {
                DeliveryPriorityCode?: PriorityCode;
                Incoterms?: Incoterms;
                PartialDeliveryControlCode?: PartialDeliveryControlCode;
            }

            interface SalesOrderByElementsResponseItemLocation {
                LocationID?: LocationID;
                UsedAddress?: SalesOrderMaintainRequestPartyAddress;
            }

            interface SalesOrderByElementsResponseItemProduct {
                ProductID?: NOCONVERSION_ProductID;
                ProductInternalID?: ProductInternalID;
                ProductStandardID?: ProductStandardID;
                ProductBuyerID?: ProductPartyID;
                UnitOfMeasure?: MeasureUnitCode;
                ProductRequirementSpecificationKey?: RequirementSpecificationKey;
                BaseQuantity?: Quantity;
                BaseUnitOfMeasure?: MeasureUnitCode;
            }

            interface SalesOrderByElementsResponseItemSalesTerms {
                IndustrialSectorCode?: IndustrialSectorCode;
                CancellationReasonCode?: CancellationReasonCode;
            }

            interface SalesOrderByElementsResponseItemScheduleLine {
                ID?: BusinessTransactionDocumentItemScheduleLineID;
                TypeCode?: BusinessTransactionDocumentItemScheduleLineTypeCode;
                Quantity?: Quantity;
                QuantityTypeCode?: QuantityTypeCode;
                QuantityTypeName?: Name;
                MeasureUnitName?: Name;
                MeasureUnitCommonName?: Name;
                DateTimePeriod?: UPPEROPEN_LOCALNORMALISED_DateTimePeriod;
                ProductAvailabilityConfirmationCommitmentCode?: ProductAvailabilityConfirmationCommitmentCode;
                RelatedID?: BusinessTransactionDocumentItemScheduleLineID;
            }

            interface SalesOrderByElementsResponseItemServiceTerms {
                ConfirmationRelevanceIndicator?: Indicator;
                EmployeeTimeConfirmationRelevanceIndicator?: Indicator;
                ExpenseReportingConfirmationRelevanceIndicator?: Indicator;
                ServiceWorkingConditionsCode?: ServiceWorkingConditionsCode;
                ServicePlannedDuration?: Duration;
                WarrantyKey?: ProductKey;
                WarrantyValidityPeriod?: CLOSED_DatePeriod;
                ResourceID?: ResourceID;
                ProjectTaskID?: ProjectElementID;
            }

            interface SalesOrderByElementsResponseItemStatus {
                ConsistencyStatusCode?: ConsistencyStatusCode;
                ConsistencyStatusName?: Name;
                ProductAvailabilityConfirmationStatusCode?: ProductAvailabilityConfirmationStatusCode;
                ProductAvailabilityConfirmationStatusName?: Name;
                FulfilmentDataCompletenessStatusCode?: DataCompletenessStatusCode;
                FulfilmentDataCompletenessStatusName?: Name;
                InvoicingDataCompletenessStatusCode?: DataCompletenessStatusCode;
                InvoicingDataCompletenessStatusName?: Name;
                PricingDataCompletenessStatusCode?: DataCompletenessStatusCode;
                PricingDataCompletenessStatusName?: Name;
                GeneralDataCompletenessStatusCode?: DataCompletenessStatusCode;
                GeneralDataCompletenessStatusName?: Name;
                FulfilmentProcessingStatusCode?: ProcessingStatusCode;
                FulfilmentProcessingStatusName?: Name;
                InvoiceProcessingStatusCode?: ProcessingStatusCode;
                InvoiceProcessingStatusName?: Name;
                CustomerOrderLifeCycleStatusCode?: CustomerOrderLifeCycleStatusCode;
                CustomerOrderLifeCycleStatusName?: Name;
                CancellationStatusCode?: CancellationStatusCode;
                CancellationStatusName?: Name;
                PlanningReleaseStatusCode?: ReleaseStatusCode;
                PlanningReleaseStatusName?: Name;
                ExecutionReleaseStatusCode?: ReleaseStatusCode;
                ExecutionReleaseStatusName?: Name;
                ApprovalStatusCode?: ApprovalStatusCode;
                ApprovalStatusName?: Name;
                ReleaseStatusCode?: ReleaseStatusCode;
                ReleaseStatusName?: Name;
            }

            interface SalesOrderByElementsResponseMessage_sync {
                SalesOrder?: SalesOrderByElementsResponse[];
                ProcessingConditions?: ResponseProcessingConditions;
                Log?: Log;
            }

            interface SalesOrderByElementsResponseParty {
                PartyID?: PartyID;
                StandardID?: SalesOrderPartyStandardIdentifier[];
                AddressHostUUID?: UUID;
                Address?: SalesOrderMaintainRequestPartyAddress;
                ContactParty?: SalesOrderByElementsResponsePartyContactParty[];
            }

            interface SalesOrderByElementsResponsePartyContactParty {
                PartyID?: PartyID;
                AddressHostUUID?: UUID;
                Address?: SalesOrderMaintainRequestPartyAddress;
                MainIndicator?: Indicator;
            }

            interface SalesOrderByElementsResponsePaymentControl {
                PaymentProcessingCompanyUUID?: UUID;
                PaymentProcessingCompanyID?: OrganisationalCentreID;
                PaymentProcessingBusinessPartnerUUID?: UUID;
                PaymentProcessingBusinessPartnerID?: BusinessPartnerInternalID;
                ResponsibleEmployeeUUID?: UUID;
                ResponsibleEmployeeID?: BusinessPartnerInternalID;
                PropertyMovementDirectionCode?: PropertyMovementDirectionCode;
                PaymentFormCode?: PaymentFormCode;
                PaymentAmount?: Amount;
                ExchangeRate?: ExchangeRate;
                PaymentBlock?: PaymentBlock;
                FirstPaymentInstructionTypeCode?: PaymentInstructionTypeCode;
                SecondPaymentInstructionTypeCode?: PaymentInstructionTypeCode;
                ThirdPaymentInstructionTypeCode?: PaymentInstructionTypeCode;
                FourthPaymentInstructionTypeCode?: PaymentInstructionTypeCode;
                BankChargeBearerCode?: BankChargeBearerCode;
                PaymentPriorityCode?: PriorityCode;
                SinglePaymentIndicator?: Indicator;
                DebitValueDate?: Date;
                CreditValueDate?: Date;
                PaymentReceivablesPayablesGroupID?: BusinessTransactionDocumentGroupID;
                PaymentReferenceID?: PaymentReferenceID;
                PaymentReferenceTypeCode?: PaymentReferenceTypeCode;
                Note?: MEDIUM_Note;
                ExternalPayment?: SalesOrderByElementsResponsePaymentControlExternalPayment[];
                CreditCardPayment?: SalesOrderByElementsResponsePaymentControlCreditCardPayment[];
            }

            interface SalesOrderByElementsResponsePaymentControlCreditCardPayment {
                UUID?: UUID;
                PaymentCardUUID?: UUID;
                PaymentCardKey?: PaymentCardKey;
                BusinessPartnerPaymentCardDetailsKeyID?: BusinessPartnerPaymentCardDetailsID;
                PaymentCardDataOriginTypeCode?: DataOriginTypeCode;
                PaymentCardAutomaticallyGeneratedIndicator?: Indicator;
                DeviceID?: DeviceID;
                LocationInternalID?: LocationInternalID;
                ClearingHouseAccountUUID?: UUID;
                ClearingHouseAccountKeyID?: ClearingHouseAccountID;
                PaymentCardVerificationValueText?: PaymentCardVerificationValueText;
                PaymentCardVerificationValueAvailabilityCode?: PaymentCardVerificationValueAvailabilityCode;
                PaymentCardVerificationValueCheckRequiredIndicator?: Indicator;
                AuthorisationRequiredIndicator?: Indicator;
                AuthorisationLimitAmount?: Amount;
                AuthorisationValueUnlimitedIndicator?: Indicator;
                Amount?: Amount;
                PaymentAuthorisedAmount?: Amount;
                CompanyClearingHouseID?: PartyPartyID;
                CreditCardPaymentAuthorisation?: SalesOrderByElementsResponsePaymentControlCreditCardPaymentCreditCardPaymentAuthorisation[];
            }

            interface SalesOrderByElementsResponsePaymentControlCreditCardPaymentCreditCardPaymentAuthorisation {
                UUID?: UUID;
                ID?: PaymentCardPaymentAuthorisationPartyID_V1;
                ClearingHouseID?: PaymentCardPaymentAuthorisationPartyID_V1;
                ProviderID?: PaymentCardPaymentAuthorisationPartyID_V1;
                PaymentCardHolderAuthenticationID?: PaymentCardHolderAuthenticationID;
                PaymentCardHolderAuthenticationResultCode?: PaymentCardHolderAuthenticationResultCode;
                PaymentCardHolderAuthenticationTokenText?: PaymentCardHolderAuthenticationTokenText;
                DateTime?: GLOBAL_DateTime;
                PaymentCardTransactionTypeCode?: PaymentCardTransactionTypeCode;
                PreAuthorisationIndicator?: Indicator;
                Amount?: Amount;
                ExpirationDateTime?: GLOBAL_DateTime;
                ActiveIndicator?: Indicator;
                AppliedIndicator?: Indicator;
                ResultCode?: AuthorisationResultCode;
                PaymentCardAddressVerificationResultCode?: PaymentCardAddressVerificationResultCode;
                ProductRecipientPartyPaymentCardAddressVerificationResultCode?: PaymentCardAddressVerificationResultCode;
                PaymentCardVerificationResultCode?: PaymentCardVerificationResultCode;
                PaymentCardVerificationValueVerificationResultCode?: PaymentCardVerificationValueVerificationResultCode;
                ResultDescription?: SHORT_Description;
            }

            interface SalesOrderByElementsResponsePaymentControlExternalPayment {
                UUID?: UUID;
                HouseBankAccountUUID?: UUID;
                HouseBankAccountKeyInternalID?: BankAccountInternalID;
                PaymentTransactionReferenceID?: PaymentTransactionReferenceID;
                DocumentDate?: Date;
                ValueDate?: Date;
                Amount?: Amount;
            }

            interface SalesOrderByElementsResponsePriceAndTaxCalculation {
                MainDiscount?: SalesOrderByElementsResponsePriceAndTaxCalculationMainPriceComponent;
                MainPrice?: SalesOrderByElementsResponsePriceAndTaxCalculationMainPriceComponent;
                MainSurcharge?: SalesOrderByElementsResponsePriceAndTaxCalculationMainPriceComponent;
                MainTotal?: SalesOrderByElementsResponsePriceAndTaxCalculationMainPriceComponent;
                PriceComponent?: SalesOrderByElementsResponsePriceAndTaxCalculationPriceComponent[];
                ProductTaxDetails?: SalesOrderByElementsResponsePriceAndTaxCalculationProductTaxDetails[];
                TaxationTerms?: SalesOrderByElementsResponsePriceAndTaxCalculationTaxationTerms;
                WithholdingTaxDetails?: SalesOrderByElementsResponsePriceAndTaxCalculationWithholdingTaxDetails[];
            }

            interface SalesOrderByElementsResponsePriceAndTaxCalculationItem {
                Status?: PriceAndTaxCalculationItemStatus;
                CountryCode?: CountryCode;
                TaxationCharacteristicsCode?: ProductTaxationCharacteristicsCode;
                TaxationCharacteristicsDeterminationMethodCode?: TaxationCharacteristicsDeterminationMethodCode;
                TaxJurisdictionCode?: TaxJurisdictionCode;
                TaxRegionCode?: RegionCode;
                WithholdingTaxationCharacteristicsCode?: WithholdingTaxationCharacteristicsCode;
                WithholdingTaxationCharacteristicsDeterminationMethodCode?: TaxationCharacteristicsDeterminationMethodCode;
                ItemMainDiscount?: SalesOrderByElementsResponsePriceAndTaxCalculationItemMainPriceComponent;
                ItemMainPrice?: SalesOrderByElementsResponsePriceAndTaxCalculationItemMainPriceComponent;
                ItemMainSurcharge?: SalesOrderByElementsResponsePriceAndTaxCalculationItemMainPriceComponent;
                ItemMainTotal?: SalesOrderByElementsResponsePriceAndTaxCalculationItemMainPriceComponent;
                ItemPriceComponent?: SalesOrderByElementsResponsePriceAndTaxCalculationItemPriceComponent[];
                ItemProductTaxDetails?: SalesOrderByElementsResponsePriceAndTaxCalculationItemProductTaxDetails[];
                ItemTaxationTerms?: SalesOrderByElementsResponsePriceAndTaxCalculationItemItemTaxationTerms;
                ItemWithholdingTaxDetails?: SalesOrderByElementsResponsePriceAndTaxCalculationItemItemProductTaxDetails[];
            }

            interface SalesOrderByElementsResponsePriceAndTaxCalculationItemItemProductTaxDetails {
                UUID?: UUID;
                WithholdingTax?: WithholdingTax;
                TransactionCurrencyWithholdingTax?: WithholdingTax;
            }

            interface SalesOrderByElementsResponsePriceAndTaxCalculationItemItemTaxationTerms {
                SellerCountryCode?: CountryCode;
                SellerTaxID?: PartyTaxID;
                SellerTaxIdentificationNumberTypeCode?: TaxIdentificationNumberTypeCode;
                BuyerCountryCode?: CountryCode;
                BuyerTaxID?: PartyTaxID;
                BuyerTaxIdentificationNumberTypeCode?: TaxIdentificationNumberTypeCode;
                EuropeanCommunityVATTriangulationIndicator?: Indicator;
                TaxDate?: Date;
                TaxDueDate?: Date;
                TaxExemptionCertificateID?: TaxExemptionCertificateID;
                TaxExemptionReasonCode?: TaxExemptionReasonCode;
                TaxExemptionReasonCodeRelevanceIndicator?: Indicator;
                FollowUpTaxExemptionCertificateID?: TaxExemptionCertificateID;
                ProductTaxStandardClassificationCode?: ProductTaxStandardClassificationCode;
                ProductTaxStandardClassificationSystemCode?: ProductTaxStandardClassificationSystemCode;
            }

            interface SalesOrderByElementsResponsePriceAndTaxCalculationItemMainPriceComponent {
                Description?: SHORT_Description;
                TypeCode?: PriceSpecificationElementTypeCode;
                CategoryCode?: PriceSpecificationElementCategoryCode;
                PurposeCode?: PriceSpecificationElementPurposeCode;
                Rate?: Rate;
                RateBaseQuantityTypeCode?: QuantityTypeCode;
                CalculationBasis?: PriceComponentCalculationBasis;
                CalculatedAmount?: Amount;
                RoundingDifferenceAmount?: Amount;
                EffectiveIndicator?: Indicator;
                GroupedIndicator?: Indicator;
                ManuallyChangedIndicator?: Indicator;
                DescriptionManuallyChangedIndicator?: Indicator;
                FixationCode?: PriceComponentFixationCode;
                InactivityReasonCode?: PriceComponentInactivityReasonCode;
                OriginCode?: PriceComponentOriginCode;
            }

            interface SalesOrderByElementsResponsePriceAndTaxCalculationItemPriceComponent {
                UUID?: UUID;
                Description?: SHORT_Description;
                MajorLevelOrdinalNumberValue?: OrdinalNumberValue;
                MinorLevelOrdinalNumberValue?: OrdinalNumberValue;
                TypeCode?: PriceSpecificationElementTypeCode;
                CategoryCode?: PriceSpecificationElementCategoryCode;
                PurposeCode?: PriceSpecificationElementPurposeCode;
                Rate?: Rate;
                RateBaseQuantityTypeCode?: QuantityTypeCode;
                CalculationBasis?: PriceComponentCalculationBasis;
                CalculatedAmount?: Amount;
                RoundingDifferenceAmount?: Amount;
                EffectiveIndicator?: Indicator;
                GroupedIndicator?: Indicator;
                ManuallyChangedIndicator?: Indicator;
                DescriptionManuallyChangedIndicator?: Indicator;
                FixationCode?: PriceComponentFixationCode;
                InactivityReasonCode?: PriceComponentInactivityReasonCode;
                OriginCode?: PriceComponentOriginCode;
            }

            interface SalesOrderByElementsResponsePriceAndTaxCalculationItemProductTaxDetails {
                UUID?: UUID;
                ProductTax?: ProductTax;
                TransactionCurrencyProductTax?: ProductTax;
            }

            interface SalesOrderByElementsResponsePriceAndTaxCalculationMainPriceComponent {
                Description?: SHORT_Description;
                TypeCode?: PriceSpecificationElementTypeCode;
                CategoryCode?: PriceSpecificationElementCategoryCode;
                PurposeCode?: PriceSpecificationElementPurposeCode;
                Rate?: Rate;
                RateBaseQuantityTypeCode?: QuantityTypeCode;
                CalculationBasis?: PriceComponentCalculationBasis;
                CalculatedAmount?: Amount;
                RoundingDifferenceAmount?: Amount;
                EffectiveIndicator?: Indicator;
                GroupedIndicator?: Indicator;
                ManuallyChangedIndicator?: Indicator;
                DescriptionManuallyChangedIndicator?: Indicator;
                FixationCode?: PriceComponentFixationCode;
                InactivityReasonCode?: PriceComponentInactivityReasonCode;
                OriginCode?: PriceComponentOriginCode;
            }

            interface SalesOrderByElementsResponsePriceAndTaxCalculationPriceComponent {
                UUID?: UUID;
                Description?: SHORT_Description;
                MajorLevelOrdinalNumberValue?: OrdinalNumberValue;
                MinorLevelOrdinalNumberValue?: OrdinalNumberValue;
                TypeCode?: PriceSpecificationElementTypeCode;
                TypeName?: EXTENDED_Name;
                CategoryCode?: PriceSpecificationElementCategoryCode;
                CategoryName?: EXTENDED_Name;
                PurposeCode?: PriceSpecificationElementPurposeCode;
                PurposeName?: EXTENDED_Name;
                Rate?: Rate;
                RateBaseQuantityTypeCode?: QuantityTypeCode;
                RateBaseQuantityTypeName?: EXTENDED_Name;
                RateBaseMeasureUnitName?: EXTENDED_Name;
                CalculationBasis?: PriceComponentCalculationBasis;
                CalculationBasisBaseName?: EXTENDED_Name;
                CalculationBasisQuantityMeasureUnitName?: EXTENDED_Name;
                CalculationBasisQuantityTypeName?: EXTENDED_Name;
                CalculatedAmount?: Amount;
                RoundingDifferenceAmount?: Amount;
                EffectiveIndicator?: Indicator;
                GroupedIndicator?: Indicator;
                ManuallyChangedIndicator?: Indicator;
                DescriptionManuallyChangedIndicator?: Indicator;
                FixationCode?: PriceComponentFixationCode;
                InactivityReasonCode?: PriceComponentInactivityReasonCode;
                OriginCode?: PriceComponentOriginCode;
            }

            interface SalesOrderByElementsResponsePriceAndTaxCalculationProductTaxDetails {
                UUID?: UUID;
                TaxationCharacteristicsCode?: ProductTaxationCharacteristicsCode;
                TransactionCurrencyProductTax?: ProductTax;
                ProductTax?: ProductTax;
            }

            interface SalesOrderByElementsResponsePriceAndTaxCalculationTaxationTerms {
                SellerCountryCode?: CountryCode;
                SellerTaxID?: PartyTaxID;
                SellerTaxIdentificationNumberTypeCode?: TaxIdentificationNumberTypeCode;
                BuyerCountryCode?: CountryCode;
                BuyerTaxID?: PartyTaxID;
                BuyerTaxIdentificationNumberTypeCode?: TaxIdentificationNumberTypeCode;
                EuropeanCommunityVATTriangulationIndicator?: Indicator;
                TaxDate?: Date;
                TaxDueDate?: Date;
                TaxExemptionCertificateID?: TaxExemptionCertificateID;
                TaxExemptionReasonCode?: TaxExemptionReasonCode;
                TaxExemptionReasonCodeRelevanceIndicator?: Indicator;
            }

            interface SalesOrderByElementsResponsePriceAndTaxCalculationWithholdingTaxDetails {
                UUID?: UUID;
                WithholdingTax?: WithholdingTax;
                TransactionCurrencyWithholdingTax?: WithholdingTax;
            }

            interface SalesOrderByElementsResponsePricingTerms {
                CurrencyCode?: CurrencyCode;
                PriceDateTime?: LOCALNORMALISED_DateTime;
                GrossAmountIndicator: Indicator;
            }

            interface SalesOrderByElementsResponseRequestedFulfillmentPeriodPeriodTerms {
                StartDateTime?: LOCALNORMALISED_DateTime;
                EndDateTime?: LOCALNORMALISED_DateTime;
            }

            interface SalesOrderByElementsResponseSalesAndServiceBusinessArea {
                SalesOrganisationID?: OrganisationalCentreID;
                SalesGroupID?: OrganisationalCentreID;
                SalesOfficeID?: OrganisationalCentreID;
                DistributionChannelCode?: DistributionChannelCode;
                ServiceOrganisationID?: OrganisationalCentreID;
            }

            interface SalesOrderByElementsResponseSalesTerms {
                CancellationReasonCode?: CancellationReasonCode;
            }

            interface SalesOrderByElementsResponseStatus {
                PaymentAuthorisationStatusCode?: AuthorisationStatusCode;
                PaymentAuthorisationStatusName?: Name;
                ItemListCancellationStatusCode?: CancellationStatusCode;
                ItemListCancellationStatusName?: Name;
                ItemListCustomerOrderLifeCycleStatusCode?: CustomerOrderLifeCycleStatusCode;
                ItemListCustomerOrderLifeCycleStatusName?: Name;
                ItemListFulfilmentProcessingStatusCode?: ProcessingStatusCode;
                ItemListFulfilmentProcessingStatusName?: Name;
                ItemListPlanningReleaseStatusCode?: ReleaseStatusCode;
                ItemListPlanningReleaseStatusName?: Name;
                ItemListExecutionReleaseStatusCode?: ReleaseStatusCode;
                ItemListExecutionReleaseStatusName?: Name;
                ConfirmationIssuingStatusCode?: IssuingStatusCode;
                ConfirmationIssuingStatusName?: Name;
                ItemListInvoiceProcessingStatusCode?: ProcessingStatusCode;
                ItemListInvoiceProcessingStatusName?: Name;
                ApprovalStatusCode?: ApprovalStatusCode;
                ApprovalStatusName?: Name;
                ItemListProductAvailabilityConfirmationStatusCode?: ProductAvailabilityConfirmationStatusCode;
                ItemListProductAvailabilityConfirmationStatusName?: Name;
                ConsistencyStatusCode?: ConsistencyStatusCode;
                ConsistencyStatusName?: Name;
                GeneralDataCompletenessStatusCode?: DataCompletenessStatusCode;
                GeneralDataCompletenessStatusName?: Name;
                CancellationStatusCode?: CancellationStatusCode;
                CancellationStatusName?: Name;
                InvoicingBlockingStatusCode?: BlockingStatusCode;
                InvoicingBlockingStatusName?: Name;
                FulfilmentBlockingStatusCode?: BlockingStatusCode;
                FulfilmentBlockingStatusName?: Name;
                CustomerRequestReleaseStatusCode?: ReleaseStatusCode;
                CustomerRequestReleaseStatusName?: Name;
                ReleaseStatusCode?: ReleaseStatusCode;
                ReleaseStatusName?: Name;
            }

            interface SalesOrderByElementsResponseTextCollection {
                Text?: SalesOrderByElementsResponseTextCollectionText[];
            }

            interface SalesOrderByElementsResponseTextCollectionText {
                TypeCode?: TextCollectionTextTypeCode;
                CreationDateTime?: GLOBAL_DateTime;
                ContentText?: LANGUAGEINDEPENDENT_Text;
            }

            interface SalesOrderMaintainRequestPartyAddress {
                CorrespondenceLanguageCode?: LanguageCode;
                Email?: SalesOrderMaintainRequestPartyAddressEmail[];
                Facsimile?: SalesOrderMaintainRequestPartyAddressFascmile[];
                Telephone?: SalesOrderMaintainRequestPartyAddressTelephone[];
                Web?: SalesOrderMaintainRequestPartyAddressWeb[];
                DisplayName?: SalesOrderMaintainRequestPartyAddressDisplayName[];
                Name?: SalesOrderMaintainRequestPartyAddressName[];
                PostalAddress?: SalesOrderMaintainRequestPartyAddressPostalAddress[];
            }

            interface SalesOrderMaintainRequestPartyAddressDisplayName {
                FormattedName?: LONG_Name;
            }

            interface SalesOrderMaintainRequestPartyAddressEmail {
                URI?: EmailURI;
                DefaultIndicator?: Indicator;
                UsageDeniedIndicator?: Indicator;
            }

            interface SalesOrderMaintainRequestPartyAddressFascmile {
                Number?: PhoneNumber;
                FormattedNumberDescription?: LANGUAGEINDEPENDENT_SHORT_Description;
                DefaultIndicator?: Indicator;
                UsageDeniedIndicator?: Indicator;
            }

            interface SalesOrderMaintainRequestPartyAddressName {
                AddressRepresentationCode?: AddressRepresentationCode;
                Name?: OrganisationName;
            }

            interface SalesOrderMaintainRequestPartyAddressPostalAddress {
                AddressRepresentationCode?: AddressRepresentationCode;
                CountryCode?: CountryCode;
                RegionCode?: RegionCode;
                CountyName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                CityName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                AdditionalCityName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                DistrictName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                StreetPostalCode?: PostalCode;
                POBoxPostalCode?: PostalCode;
                CompanyPostalCode?: PostalCode;
                StreetPrefixName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                AdditionalStreetPrefixName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                StreetName?: StreetName;
                StreetSuffixName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                AdditionalStreetSuffixName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                HouseID?: HouseID;
                BuildingID?: BuildingID;
                RoomID?: RoomID;
                FloorID?: FloorID;
                CareOfName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                POBoxDeviatingCountryCode?: CountryCode;
                POBoxDeviatingRegionCode?: RegionCode;
                POBoxDeviatingCityName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                POBoxID?: POBoxID;
                POBoxIndicator?: Indicator;
                TaxJurisdictionCode?: TaxJurisdictionCode;
                TimeZoneCode?: TimeZoneCode;
            }

            interface SalesOrderMaintainRequestPartyAddressTelephone {
                Number?: PhoneNumber;
                FormattedNumberDescription?: LANGUAGEINDEPENDENT_SHORT_Description;
                DefaultConventionalPhoneNumberIndicator?: Indicator;
                DefaultMobilePhoneNumberIndicator?: Indicator;
                UsageDeniedIndicator?: Indicator;
                MobilePhoneNumberIndicator?: Indicator;
                SMSEnabledIndicator?: Indicator;
            }

            interface SalesOrderMaintainRequestPartyAddressWeb {
                URI?: WebURI;
                DefaultIndicator?: Indicator;
                UsageDeniedIndicator?: Indicator;
            }

            type SalesOrderPartyStandardIdentifier = SalesOrderPartyStandardIdentifier_Content | { Content: SalesOrderPartyStandardIdentifier_Content, $schemeAgencyID: undefined };

            type SalesOrderPartyStandardIdentifier_Content = token;

            interface AccessAttachmentFolder {
                UUID?: UUID;
                Document?: AccessAttachmentFolderDocument[];
            }

            interface AccessAttachmentFolderDocument {
                UUID?: UUID;
                VersionID?: VersionID;
                SystemAdministrativeData?: SystemAdministrativeData;
                LinkInternalIndicator?: Indicator;
                CheckedOutIndicator?: Indicator;
                VisibleIndicator?: Indicator;
                VersioningEnabledIndicator?: Indicator;
                CategoryCode?: DocumentCategoryCode;
                CategoryName?: LANGUAGEINDEPENDENT_LONG_Name;
                TypeCode?: DocumentTypeCode;
                TypeName?: LANGUAGEINDEPENDENT_LONG_Name;
                MIMECode?: MIMECode;
                MIMEName?: LANGUAGEINDEPENDENT_LONG_Name;
                PathName?: LANGUAGEINDEPENDENT_Name;
                Name?: LANGUAGEINDEPENDENT_Name;
                AlternativeName?: LANGUAGEINDEPENDENT_Name;
                InternalLinkUUID?: UUID;
                Description?: Description;
                ExternalLinkWebURI?: WebURI;
                FileContentURI?: URI;
                FilesizeMeasure?: Measure;
                Property?: AccessAttachmentFolderDocumentProperty[];
            }

            interface AccessAttachmentFolderDocumentProperty {
                TechnicalID?: ObjectNodeTechnicalID;
                Name?: LANGUAGEINDEPENDENT_Name;
                DataTypeFormatCode?: PropertyDataTypeFormatCode;
                DataTypeFormatName?: LANGUAGEINDEPENDENT_LONG_Name;
                VisibleIndicator?: Indicator;
                ChangeAllowedIndicator?: Indicator;
                MultipleValueIndicator?: Indicator;
                NamespaceURI?: NamespaceURI;
                Description?: Description;
                PropertyValue?: AccessAttachmentFolderDocumentPropertyPropertyValue[];
            }

            interface AccessAttachmentFolderDocumentPropertyPropertyValue {
                TechnicalID?: ObjectNodeTechnicalID;
                Text?: LANGUAGEINDEPENDENT_Text;
                Indicator?: Indicator;
                DateTime?: GLOBAL_DateTime;
                IntegerValue?: IntegerValue;
            }

            type AddressRepresentationCode = AddressRepresentationCode_Content | { Content: AddressRepresentationCode_Content, $listAgencyID?: undefined };

            type AddressRepresentationCode_Content = token;

            type AgencyIdentificationCode = token;

            type Amount = Amount_Content | { Content: Amount_Content, $currencyCode: CurrencyCode };

            type Amount_Content = decimal;

            type ApprovalStatusCode = "1" | "2" | "3" | "4" | "5" | "6" | "7";

            type AuthorisationResultCode = token;

            type AuthorisationStatusCode = "1" | "2" | "3" | "4";

            type BankAccountInternalID = BankAccountInternalID_Content | { Content: BankAccountInternalID_Content, $schemeAgencyID?: undefined };

            type BankAccountInternalID_Content = token;

            type BankChargeBearerCode = token;

            type BlockingStatusCode = "1" | "2" | "3";

            type BuildingID = token;

            type BusinessPartnerInternalID = token;

            type BusinessPartnerPaymentCardDetailsID = token;

            type BusinessTransactionDocumentGroupID = token;

            type BusinessTransactionDocumentID = BusinessTransactionDocumentID_Content | { Content: BusinessTransactionDocumentID_Content, $schemeID?: undefined, $schemeAgencyID?: undefined, $schemeAgencySchemeAgencyID?: AgencyIdentificationCode };

            type BusinessTransactionDocumentID_Content = token;

            type BusinessTransactionDocumentItemGroupID = token;

            type BusinessTransactionDocumentItemID = token;

            type BusinessTransactionDocumentItemProcessingTypeCode = token;

            type BusinessTransactionDocumentItemScheduleLineID = token;

            type BusinessTransactionDocumentItemScheduleLineTypeCode = token;

            type BusinessTransactionDocumentItemTypeCode = token;

            interface BusinessTransactionDocumentReference {
                ID: BusinessTransactionDocumentID;
                UUID?: UUID;
                TypeCode?: BusinessTransactionDocumentTypeCode;
                ItemID?: BusinessTransactionDocumentItemID;
                ItemUUID?: UUID;
                ItemTypeCode?: BusinessTransactionDocumentItemTypeCode;
            }

            type BusinessTransactionDocumentRelationshipRoleCode = token;

            type BusinessTransactionDocumentTypeCode = BusinessTransactionDocumentTypeCode_Content | { Content: BusinessTransactionDocumentTypeCode_Content, $listID?: undefined, $listVersionID?: undefined, $listAgencyID?: undefined };

            type BusinessTransactionDocumentTypeCode_Content = token;

            interface CLOSED_DatePeriod {
                StartDate: Date;
                EndDate: Date;
            }

            type CalculationStatusCode = "1" | "2" | "3" | "4" | "5" | "6";

            type CancellationReasonCode = CancellationReasonCode_Content | { Content: CancellationReasonCode_Content, $listAgencyID?: undefined };

            type CancellationReasonCode_Content = token;

            type CancellationStatusCode = "1" | "2" | "3" | "4" | "5" | "6";

            type CashDiscountTermsCode = CashDiscountTermsCode_Content | { Content: CashDiscountTermsCode_Content, $listAgencyID?: undefined };

            type CashDiscountTermsCode_Content = token;

            type ChangeStateID = token;

            type ClearingHouseAccountID = ClearingHouseAccountID_Content | { Content: ClearingHouseAccountID_Content, $schemeAgencyID?: undefined };

            type ClearingHouseAccountID_Content = token;

            type ConsistencyStatusCode = "1" | "2" | "3";

            type CountryCode = token;

            type CountryDiallingCode = token;

            type CurrencyCode = token;

            type CustomerOrderLifeCycleStatusCode = "4" | "1" | "2" | "3";

            type CustomerTransactionDocumentDataOriginTypeCode = token;

            type CustomerTransactionDocumentFulfilmentBlockingReasonCode = token;

            type CustomerTransactionDocumentServiceConfirmationCreationCode = CustomerTransactionDocumentServiceConfirmationCreationCode_Content | { Content: CustomerTransactionDocumentServiceConfirmationCreationCode_Content, $listID?: undefined, $listAgencyID?: undefined };

            type CustomerTransactionDocumentServiceConfirmationCreationCode_Content = token;

            type DataCompletenessStatusCode = "1" | "2" | "3";

            type DataOriginTypeCode = DataOriginTypeCode_Content | { Content: DataOriginTypeCode_Content, $listID?: undefined, $listAgencyID?: undefined };

            type DataOriginTypeCode_Content = token;

            interface DatePeriod {
                StartDate?: Date;
                EndDate?: Date;
                Duration?: Duration;
            }

            type DecimalValue = decimal;

            type Description = string | { Content: string, $languageCode?: LanguageCode };

            type DeviceID = DeviceID_Content | { Content: DeviceID_Content, $schemeAgencyID?: undefined };

            type DeviceID_Content = token;

            type DistributionChannelCode = DistributionChannelCode_Content | { Content: DistributionChannelCode_Content, $listID?: undefined, $listAgencyID?: undefined };

            type DistributionChannelCode_Content = token;

            type DocumentCategoryCode = token;

            type DocumentTypeCode = DocumentTypeCode_Content | { Content: DocumentTypeCode_Content, $listID?: undefined, $listVersionID?: undefined, $listAgencyID?: undefined, $listAgencySchemeID?: undefined, $listAgencySchemeAgencyID?: AgencyIdentificationCode };

            type DocumentTypeCode_Content = token;

            type DueCategoryCode = token;

            type Duration = duration;

            type EXTENDED_Name = EXTENDED_Name_Content | { Content: EXTENDED_Name_Content, $languageCode?: LanguageCode };

            type EXTENDED_Name_Content = string;

            type EmailURI = anyURI | { Content: anyURI, $schemeID?: undefined };

            interface ExchangeRate {
                UnitCurrency: CurrencyCode;
                QuotedCurrency: CurrencyCode;
                Rate: ExchangeRateRate;
                QuotationDateTime?: GLOBAL_DateTime;
            }

            type ExchangeRateRate = decimal;

            type FloorID = token;

            type FormOfAddressCode = FormOfAddressCode_Content | { Content: FormOfAddressCode_Content, $listID?: undefined, $listVersionID?: undefined, $listAgencyID?: undefined, $listAgencySchemeID?: undefined, $listAgencySchemeAgencyID?: AgencyIdentificationCode };

            type FormOfAddressCode_Content = token;

            type FulfilmentPartyCategoryCode = FulfilmentPartyCategoryCode_Content | { Content: FulfilmentPartyCategoryCode_Content, $listID?: undefined, $listAgencyID?: undefined };

            type FulfilmentPartyCategoryCode_Content = token;

            type HouseID = token;

            type InclusionExclusionCode = token;

            interface Incoterms {
                ClassificationCode: IncotermsClassificationCode;
                TransferLocationName?: IncotermsTransferLocationName;
            }

            type IncotermsClassificationCode = token;

            type IncotermsTransferLocationName = string;

            type Indicator = boolean;

            type IndustrialSectorCode = IndustrialSectorCode_Content | { Content: IndustrialSectorCode_Content, $listID?: undefined, $listAgencyID?: undefined };

            type IndustrialSectorCode_Content = token;

            type IntegerValue = int;

            type IntervalBoundaryTypeCode = token;

            type InvoicingBlockingReasonCode = token;

            type IssuingStatusCode = "1" | "2" | "3" | "4";

            type LANGUAGEINDEPENDENT_LONG_Name = string;

            type LANGUAGEINDEPENDENT_MEDIUM_Name = string;

            type LANGUAGEINDEPENDENT_Name = string;

            type LANGUAGEINDEPENDENT_SHORT_Description = string;

            type LANGUAGEINDEPENDENT_Text = string;

            type LOCALNORMALISED_DateTime = LOCALNORMALISED_DateTime_Content | { Content: LOCALNORMALISED_DateTime_Content, $timeZoneCode: TimeZoneCode };

            type LOCALNORMALISED_DateTime_Content = dateTime;

            type LONG_Name = LONG_Name_Content | { Content: LONG_Name_Content, $languageCode?: LanguageCode };

            type LONG_Name_Content = string;

            type LegallyRequiredPhraseText = string;

            type LocationID = LocationID_Content | { Content: LocationID_Content, $schemeID?: undefined, $schemeAgencyID?: undefined, $schemeAgencySchemeID?: undefined, $schemeAgencySchemeAgencyID?: AgencyIdentificationCode };

            type LocationID_Content = token;

            type LocationInternalID = LocationInternalID_Content | { Content: LocationInternalID_Content, $schemeID?: undefined, $schemeAgencyID?: undefined };

            type LocationInternalID_Content = token;

            interface Log {
                BusinessDocumentProcessingResultCode?: ProcessingResultCode;
                MaximumLogItemSeverityCode?: LogItemSeverityCode;
                Item?: LogItem[];
            }

            interface LogItem {
                TypeID?: LogItemTypeID;
                CategoryCode?: LogItemCategoryCode;
                SeverityCode?: LogItemSeverityCode;
                ReferenceObjectNodeSenderTechnicalID?: ObjectNodePartyTechnicalID;
                ReferenceMessageElementName?: LANGUAGEINDEPENDENT_Name;
                Note: LogItemNote;
                NoteTemplateText?: LogItemNoteTemplateText;
                LogItemNotePlaceholderSubstitutionList?: LogItemNotePlaceholderSubstitutionList;
                WebURI?: WebURI;
            }

            type LogItemCategoryCode = LogItemCategoryCode_Content | { Content: LogItemCategoryCode_Content, $listID?: undefined, $listVersionID?: undefined, $listAgencyID?: undefined, $listAgencySchemeID?: undefined, $listAgencySchemeAgencyID?: AgencyIdentificationCode };

            type LogItemCategoryCode_Content = token;

            type LogItemNote = string;

            interface LogItemNotePlaceholderSubstitutionList {
                FirstPlaceholderID: LogItemTemplatePlaceholderID;
                SecondPlaceholderID?: LogItemTemplatePlaceholderID;
                ThirdPlaceholderID?: LogItemTemplatePlaceholderID;
                FourthPlaceholderID?: LogItemTemplatePlaceholderID;
                FirstPlaceholderSubstitutionText: LogItemPlaceholderSubstitutionText;
                SecondPlaceholderSubstitutionText?: LogItemPlaceholderSubstitutionText;
                ThirdPlaceholderSubstitutionText?: LogItemPlaceholderSubstitutionText;
                FourthPlaceholderSubstitutionText?: LogItemPlaceholderSubstitutionText;
            }

            type LogItemNoteTemplateText = string;

            type LogItemPlaceholderSubstitutionText = string;

            type LogItemSeverityCode = token;

            type LogItemTemplatePlaceholderID = token;

            type LogItemTypeID = token;

            type MEDIUM_Name = MEDIUM_Name_Content | { Content: MEDIUM_Name_Content, $languageCode?: LanguageCode };

            type MEDIUM_Name_Content = string;

            type MEDIUM_Note = MEDIUM_Note_Content | { Content: MEDIUM_Note_Content, $languageCode?: LanguageCode };

            type MEDIUM_Note_Content = string;

            type MIMECode = token;

            type Measure = Measure_Content | { Content: Measure_Content, $unitCode: MeasureUnitCode };

            type Measure_Content = decimal;

            type MeasureUnitCode = token;

            type NOCONVERSION_ProductID = NOCONVERSION_ProductID_Content | { Content: NOCONVERSION_ProductID_Content, $schemeID?: undefined, $schemeAgencyID?: undefined };

            type NOCONVERSION_ProductID_Content = token;

            type Name = string | { Content: string, $languageCode?: LanguageCode };

            type NamespaceURI = anyURI | { Content: anyURI, $schemeID?: undefined };

            type NumberValue = int;

            type ObjectID = ObjectID_Content | { Content: ObjectID_Content, $schemeID?: undefined, $schemeVersionID?: undefined, $schemeAgencyID?: undefined, $schemeAgencySchemeID?: undefined, $schemeAgencySchemeAgencyID?: AgencyIdentificationCode };

            type ObjectID_Content = token;

            type ObjectNodePartyTechnicalID = token;

            type ObjectNodeTechnicalID = token;

            type OrdinalNumberValue = int;

            interface OrganisationName {
                FormOfAddressCode?: FormOfAddressCode;
                FirstLineName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                SecondLineName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                ThirdLineName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
                FourthLineName?: LANGUAGEINDEPENDENT_MEDIUM_Name;
            }

            type OrganisationalCentreID = token;

            type POBoxID = token;

            type PartialDeliveryControlCode = token;

            type PartyID = PartyID_Content | { Content: PartyID_Content, $schemeID?: undefined, $schemeAgencyID?: undefined, $schemeAgencySchemeID?: undefined, $schemeAgencySchemeAgencyID?: AgencyIdentificationCode };

            type PartyID_Content = token;

            type PartyPartyID = token;

            type PartyTaxID = PartyTaxID_Content | { Content: PartyTaxID_Content, $schemeID: undefined };

            type PartyTaxID_Content = token;

            interface PaymentBlock {
                PaymentBlockingReasonCode?: PaymentBlockingReasonCode;
                ExpirationDateTime: GLOBAL_DateTime;
                CreationIdentityUUID?: UUID;
                CreationDateTime?: GLOBAL_DateTime;
            }

            type PaymentBlockingReasonCode = PaymentBlockingReasonCode_Content | { Content: PaymentBlockingReasonCode_Content, $listID?: undefined, $listVersionID?: undefined, $listAgencyID?: undefined };

            type PaymentBlockingReasonCode_Content = token;

            type PaymentCardAddressVerificationResultCode = token;

            type PaymentCardHolderAuthenticationID = PaymentCardHolderAuthenticationID_Content | { Content: PaymentCardHolderAuthenticationID_Content, $schemeID?: undefined, $schemeAgencyID?: undefined };

            type PaymentCardHolderAuthenticationID_Content = token;

            type PaymentCardHolderAuthenticationResultCode = PaymentCardHolderAuthenticationResultCode_Content | { Content: PaymentCardHolderAuthenticationResultCode_Content, $listID?: undefined, $listAgencyID?: undefined };

            type PaymentCardHolderAuthenticationResultCode_Content = token;

            type PaymentCardHolderAuthenticationTokenText = string;

            type PaymentCardID = PaymentCardID_Content | { Content: PaymentCardID_Content, $schemeID?: undefined, $schemeAgencyID?: undefined };

            type PaymentCardID_Content = token;

            type PaymentCardPaymentAuthorisationPartyID_V1 = PaymentCardPaymentAuthorisationPartyID_V1_Content | { Content: PaymentCardPaymentAuthorisationPartyID_V1_Content, $schemeID?: undefined, $schemeAgencyID?: undefined };

            type PaymentCardPaymentAuthorisationPartyID_V1_Content = token;

            type PaymentCardTransactionTypeCode = token;

            type PaymentCardTypeCode = PaymentCardTypeCode_Content | { Content: PaymentCardTypeCode_Content, $listID?: undefined, $listVersionID?: undefined, $listAgencyID?: undefined };

            type PaymentCardTypeCode_Content = token;

            type PaymentCardVerificationResultCode = token;

            type PaymentCardVerificationValueAvailabilityCode = PaymentCardVerificationValueAvailabilityCode_Content | { Content: PaymentCardVerificationValueAvailabilityCode_Content, $listVersionID?: undefined };

            type PaymentCardVerificationValueAvailabilityCode_Content = token;

            type PaymentCardVerificationValueText = string;

            type PaymentCardVerificationValueVerificationResultCode = token;

            type PaymentFormCode = token;

            type PaymentInstructionTypeCode = token;

            type PaymentReferenceID = token;

            type PaymentReferenceTypeCode = token;

            type PaymentTransactionReferenceID = token;

            type Percent = decimal;

            interface PhoneNumber {
                AreaID?: PhoneNumberAreaID;
                SubscriberID?: PhoneNumberSubscriberID;
                ExtensionID?: PhoneNumberExtensionID;
                CountryCode?: CountryCode;
                CountryDiallingCode?: CountryDiallingCode;
                CountryName?: MEDIUM_Name;
            }

            type PhoneNumberAreaID = token;

            type PhoneNumberExtensionID = token;

            type PhoneNumberSubscriberID = token;

            type PostalCode = token;

            interface PriceComponentCalculationBasis {
                BaseCode: PriceSpecificationBaseCode;
                Quantity?: Quantity;
                QuantityTypeCode?: QuantityTypeCode;
                Amount?: Amount;
                AdaptationFactorDecimalValue?: DecimalValue;
            }

            type PriceComponentFixationCode = token;

            type PriceComponentInactivityReasonCode = token;

            type PriceComponentOriginCode = token;

            type PriceSpecificationBaseCode = token;

            type PriceSpecificationElementCategoryCode = PriceSpecificationElementCategoryCode_Content | { Content: PriceSpecificationElementCategoryCode_Content, $listVersionID?: undefined };

            type PriceSpecificationElementCategoryCode_Content = token;

            type PriceSpecificationElementPurposeCode = PriceSpecificationElementPurposeCode_Content | { Content: PriceSpecificationElementPurposeCode_Content, $listVersionID?: undefined };

            type PriceSpecificationElementPurposeCode_Content = token;

            type PriceSpecificationElementTypeCode = PriceSpecificationElementTypeCode_Content | { Content: PriceSpecificationElementTypeCode_Content, $listID?: undefined, $listAgencyID?: undefined };

            type PriceSpecificationElementTypeCode_Content = token;

            type PriorityCode = token;

            type ProcessingResultCode = token;

            type ProcessingStatusCode = "1" | "2" | "3" | "4" | "5";

            type ProductAvailabilityConfirmationCommitmentCode = ProductAvailabilityConfirmationCommitmentCode_Content | { Content: ProductAvailabilityConfirmationCommitmentCode_Content, $listID?: undefined, $listAgencyID?: undefined };

            type ProductAvailabilityConfirmationCommitmentCode_Content = token;

            type ProductAvailabilityConfirmationStatusCode = "1" | "2" | "3" | "4";

            type ProductID = ProductID_Content | { Content: ProductID_Content, $schemeID?: undefined, $schemeAgencyID?: undefined };

            type ProductID_Content = token;

            type ProductIdentifierTypeCode = token;

            type ProductInternalID = ProductInternalID_Content | { Content: ProductInternalID_Content, $schemeID?: undefined, $schemeAgencyID?: undefined };

            type ProductInternalID_Content = token;

            type ProductPartyID = token;

            type ProductStandardID = ProductStandardID_Content | { Content: ProductStandardID_Content, $schemeID?: undefined, $schemeAgencyID: undefined };

            type ProductStandardID_Content = token;

            interface ProductTax {
                CountryCode?: CountryCode;
                RegionCode?: RegionCode;
                JurisdictionCode?: TaxJurisdictionCode;
                JurisdictionSubdivisionCode?: TaxJurisdictionSubdivisionCode;
                JurisdictionSubdivisionTypeCode?: TaxJurisdictionSubdivisionTypeCode;
                EventTypeCode?: ProductTaxEventTypeCode;
                TypeCode?: TaxTypeCode;
                RateTypeCode?: TaxRateTypeCode;
                CurrencyCode?: CurrencyCode;
                BaseAmount?: Amount;
                Percent?: Percent;
                BaseQuantity?: Quantity;
                BaseQuantityTypeCode?: QuantityTypeCode;
                Rate?: Rate;
                Amount?: Amount;
                InternalAmount?: Amount;
                NonDeductiblePercent?: Percent;
                NonDeductibleAmount?: Amount;
                DeductibleAmount?: Amount;
                DeductibilityCode?: TaxDeductibilityCode;
                BusinessTransactionDocumentItemGroupID?: BusinessTransactionDocumentItemGroupID;
                EuropeanCommunityVATTriangulationIndicator?: Indicator;
                DueCategoryCode?: DueCategoryCode;
                StatisticRelevanceIndicator?: Indicator;
                DeferredIndicator?: Indicator;
                Exemption?: TaxExemption;
                FollowUpExemption?: TaxExemption;
                LegallyRequiredPhrase?: LegallyRequiredPhraseText;
                ExchangeRate?: ExchangeRate;
            }

            type ProductTaxEventTypeCode = ProductTaxEventTypeCode_Content | { Content: ProductTaxEventTypeCode_Content, $listID: undefined, $listVersionID?: undefined, $listAgencyID?: undefined };

            type ProductTaxEventTypeCode_Content = token;

            type ProductTaxStandardClassificationCode = ProductTaxStandardClassificationCode_Content | { Content: ProductTaxStandardClassificationCode_Content, $listID?: undefined, $listAgencyID?: undefined };

            type ProductTaxStandardClassificationCode_Content = token;

            type ProductTaxStandardClassificationSystemCode = ProductTaxStandardClassificationSystemCode_Content | { Content: ProductTaxStandardClassificationSystemCode_Content, $listID?: undefined, $listAgencyID?: undefined };

            type ProductTaxStandardClassificationSystemCode_Content = token;

            type ProductTaxationCharacteristicsCode = ProductTaxationCharacteristicsCode_Content | { Content: ProductTaxationCharacteristicsCode_Content, $listID: undefined, $listVersionID?: undefined, $listAgencyID?: undefined };

            type ProductTaxationCharacteristicsCode_Content = token;

            type ProductTypeCode = token;

            type ProjectElementID = ProjectElementID_Content | { Content: ProjectElementID_Content, $schemeID?: undefined, $schemeAgencyID?: undefined };

            type ProjectElementID_Content = token;

            type PropertyDataTypeFormatCode = token;

            type PropertyMovementDirectionCode = token;

            type Quantity = Quantity_Content | { Content: Quantity_Content, $unitCode?: MeasureUnitCode };

            type Quantity_Content = decimal;

            type QuantityTypeCode = QuantityTypeCode_Content | { Content: QuantityTypeCode_Content, $listID?: undefined, $listVersionID?: undefined, $listAgencyID?: undefined, $listAgencySchemeID?: undefined, $listAgencySchemeAgencyID?: AgencyIdentificationCode };

            type QuantityTypeCode_Content = token;

            interface QueryProcessingConditions {
                QueryHitsMaximumNumberValue?: NumberValue;
                QueryHitsUnlimitedIndicator: Indicator;
                LastReturnedObjectID?: ObjectID;
            }

            interface Rate {
                DecimalValue: DecimalValue;
                MeasureUnitCode?: MeasureUnitCode;
                CurrencyCode?: CurrencyCode;
                BaseDecimalValue?: DecimalValue;
                BaseMeasureUnitCode?: MeasureUnitCode;
                BaseCurrencyCode?: CurrencyCode;
            }

            type RegionCode = RegionCode_Content | { Content: RegionCode_Content, $listID?: undefined, $listVersionID?: undefined, $listAgencyID?: undefined, $listAgencySchemeID?: undefined, $listAgencySchemeAgencyID?: AgencyIdentificationCode };

            type RegionCode_Content = token;

            type ReleaseStatusCode = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

            type RequirementSpecificationID = RequirementSpecificationID_Content | { Content: RequirementSpecificationID_Content, $schemeID?: undefined, $schemeAgencyID?: undefined };

            type RequirementSpecificationID_Content = token;

            type ResourceID = ResourceID_Content | { Content: ResourceID_Content, $schemeID?: undefined, $schemeAgencyID?: undefined };

            type ResourceID_Content = token;

            interface ResponseProcessingConditions {
                ReturnedQueryHitsNumberValue: NumberValue;
                MoreHitsAvailableIndicator: Indicator;
                LastReturnedObjectID?: ObjectID;
            }

            type RoomID = token;

            type SHORT_Description = SHORT_Description_Content | { Content: SHORT_Description_Content, $languageCode?: LanguageCode };

            type SHORT_Description_Content = string;

            type ServiceWorkingConditionsCode = ServiceWorkingConditionsCode_Content | { Content: ServiceWorkingConditionsCode_Content, $listID?: undefined, $listAgencyID?: undefined };

            type ServiceWorkingConditionsCode_Content = token;

            type StreetName = string;

            interface SystemAdministrativeData {
                CreationDateTime: GLOBAL_DateTime;
                CreationIdentityUUID?: UUID;
                LastChangeDateTime?: GLOBAL_DateTime;
                LastChangeIdentityUUID?: UUID;
            }

            type TaxDeductibilityCode = TaxDeductibilityCode_Content | { Content: TaxDeductibilityCode_Content, $listID?: undefined, $listAgencyID?: undefined };

            type TaxDeductibilityCode_Content = token;

            interface TaxExemption {
                CertificateID: TaxExemptionCertificateID;
                InternalCertificateID?: TaxExemptionCertificateID;
                ValidityPeriod?: DatePeriod;
                Percent?: Percent;
                Amount?: Amount;
                ReasonCode?: TaxExemptionReasonCode;
            }

            type TaxExemptionCertificateID = TaxExemptionCertificateID_Content | { Content: TaxExemptionCertificateID_Content, $schemeAgencyID?: undefined };

            type TaxExemptionCertificateID_Content = token;

            type TaxExemptionReasonCode = TaxExemptionReasonCode_Content | { Content: TaxExemptionReasonCode_Content, $listID: undefined, $listVersionID?: undefined, $listAgencyID?: undefined };

            type TaxExemptionReasonCode_Content = token;

            type TaxIdentificationNumberTypeCode = TaxIdentificationNumberTypeCode_Content | { Content: TaxIdentificationNumberTypeCode_Content, $listID?: undefined, $listAgencyID?: undefined };

            type TaxIdentificationNumberTypeCode_Content = token;

            type TaxJurisdictionCode = TaxJurisdictionCode_Content | { Content: TaxJurisdictionCode_Content, $listID?: undefined, $listAgencyID?: undefined };

            type TaxJurisdictionCode_Content = token;

            type TaxJurisdictionSubdivisionCode = TaxJurisdictionSubdivisionCode_Content | { Content: TaxJurisdictionSubdivisionCode_Content, $listID?: undefined, $listAgencyID?: undefined };

            type TaxJurisdictionSubdivisionCode_Content = token;

            type TaxJurisdictionSubdivisionTypeCode = TaxJurisdictionSubdivisionTypeCode_Content | { Content: TaxJurisdictionSubdivisionTypeCode_Content, $listID?: undefined, $listVersionID?: undefined, $listAgencyID?: undefined };

            type TaxJurisdictionSubdivisionTypeCode_Content = token;

            type TaxRateTypeCode = TaxRateTypeCode_Content | { Content: TaxRateTypeCode_Content, $listID: undefined, $listVersionID?: undefined, $listAgencyID?: undefined };

            type TaxRateTypeCode_Content = token;

            type TaxTypeCode = TaxTypeCode_Content | { Content: TaxTypeCode_Content, $listID: undefined, $listVersionID?: undefined, $listAgencyID?: undefined };

            type TaxTypeCode_Content = token;

            type TaxationCharacteristicsDeterminationMethodCode = token;

            type TextCollectionTextTypeCode = TextCollectionTextTypeCode_Content | { Content: TextCollectionTextTypeCode_Content, $listID?: undefined, $listVersionID?: undefined, $listAgencyID?: undefined, $listAgencySchemeID?: undefined, $listAgencySchemeAgencyID?: AgencyIdentificationCode };

            type TextCollectionTextTypeCode_Content = token;

            type TimeZoneCode = token;

            type TransmissionRequestCode = "1" | "2" | "3" | "4";

            interface UPPEROPEN_LOCALNORMALISED_DateTimePeriod {
                StartDateTime?: LOCALNORMALISED_DateTime;
                EndDateTime?: LOCALNORMALISED_DateTime;
            }

            type URI = anyURI | { Content: anyURI, $schemeID?: undefined };

            type UUID = UUID_Content | { Content: UUID_Content, $schemeID?: undefined, $schemeAgencyID?: undefined };

            type UUID_Content = token;

            type VersionID = token;

            type WebURI = anyURI;

            interface WithholdingTax {
                CountryCode?: CountryCode;
                RegionCode?: RegionCode;
                EventTypeCode?: WithholdingTaxEventTypeCode;
                TypeCode?: TaxTypeCode;
                RateTypeCode?: TaxRateTypeCode;
                CurrencyCode?: CurrencyCode;
                BaseAmount: Amount;
                Percent?: Percent;
                Amount?: Amount;
                ExcludedAmount?: Amount;
                BusinessTransactionDocumentItemGroupID?: BusinessTransactionDocumentItemGroupID;
                StatisticRelevanceIndicator?: Indicator;
                PlannedIndicator?: Indicator;
                ExchangeRate?: ExchangeRate;
                IncomeTypeCode?: WithholdingTaxIncomeTypeCode;
            }

            type WithholdingTaxEventTypeCode = WithholdingTaxEventTypeCode_Content | { Content: WithholdingTaxEventTypeCode_Content, $listID?: undefined, $listVersionID?: undefined, $listAgencyID?: undefined };

            type WithholdingTaxEventTypeCode_Content = token;

            type WithholdingTaxIncomeTypeCode = WithholdingTaxIncomeTypeCode_Content | { Content: WithholdingTaxIncomeTypeCode_Content, $listID?: undefined, $listVersionID?: undefined, $listAgencyID?: undefined };

            type WithholdingTaxIncomeTypeCode_Content = token;

            type WithholdingTaxationCharacteristicsCode = WithholdingTaxationCharacteristicsCode_Content | { Content: WithholdingTaxationCharacteristicsCode_Content, $listID: undefined, $listVersionID?: undefined, $listAgencyID?: undefined };

            type WithholdingTaxationCharacteristicsCode_Content = token;

            type GLOBAL_DateTime = dateTime;

            type LanguageCode = language;

            type CroatiaPaymentMethodCode = CroatiaPaymentMethodCode_Content | { Content: CroatiaPaymentMethodCode_Content, $listID?: undefined, $listVersionID?: undefined, $listAgencyID?: undefined };

            type CroatiaPaymentMethodCode_Content = token;

            type GLOBusinessSpaceID = token;

            type HR_BillingMachineID = token;

            type Ext00163E4A7C031EE896B639F4E2ADE19B = string;

            interface PaymentCardKey {
                ID: PaymentCardID;
                TypeCode: PaymentCardTypeCode;
            }

            interface PriceAndTaxCalculationItemStatus {
                CalculationStatusCode: CalculationStatusCode;
            }

            interface ServiceClient {
                FindByElements(input: SalesOrderByElementsQuery_sync, completed: (output: SalesOrderByElementsResponse_sync, fault: StandardFaultMessage) => void): void;
            }

            type token = string;

            type dateTime = Date;

            type date = Date;

            type time = Date;

            type int = number;

            type decimal = number;

            type float = number;

            type language = string;

            type anyURI = any;

            type duration = any;

            type base64Binary = any;

        }
    }
}
