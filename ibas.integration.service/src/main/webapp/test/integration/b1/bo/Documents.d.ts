/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import { IUserFields } from "./UserFields";
export interface IDocuments {
    atDocumentType: string;
    address: string;
    address2: string;
    addressExtension: IAddressExtension;
    agentCode: string;
    annualInvoiceDeclarationReference: number;
    applyCurrentVATRatesForDownPaymentsToDraw: number;
    applyTaxOnFirstInstallment: number;
    archiveNonremovableSalesQuotation: number;
    assetValueDate: Date;
    attachmentEntry: number;
    authorizationCode: string;
    authorizationStatus: number;
    bpChannelCode: string;
    bpChannelContact: number;
    bplName: string;
    bpL_IDAssignedToInvoice: number;
    baseAmount: number;
    baseAmountFC: number;
    baseAmountSC: number;
    billOfExchangeReserved: number;
    blanketAgreementNumber: number;
    blockDunning: number;
    box1099: string;
    cancelDate: Date;
    cancelStatus: number;
    cancelled: number;
    cardCode: string;
    cardName: string;
    cashDiscountDateOffset: number;
    centralBankIndicator: string;
    certificationNumber: string;
    closingDate: Date;
    closingOption: number;
    closingRemarks: string;
    comments: string;
    confirmed: number;
    contactPersonCode: number;
    controlAccount: string;
    createOnlineQuotation: number;
    creationDate: Date;
    dateOfReportingControlStatementVAT: Date;
    deferredTax: number;
    discountPercent: number;
    docCurrency: string;
    docDate: Date;
    docDueDate: Date;
    docEntry: number;
    docNum: number;
    docObjectCode: number;
    docObjectCodeEx: string;
    docRate: number;
    docTime: Date;
    docTotal: number;
    docTotalFc: number;
    docTotalSys: number;
    docType: number;
    documentDelivery: number;
    documentStatus: number;
    documentSubType: number;
    documentTaxID: string;
    document_ApprovalRequests: IDocument_ApprovalRequests;
    documentsOwner: number;
    downPayment: number;
    downPaymentAmount: number;
    downPaymentAmountFC: number;
    downPaymentAmountSC: number;
    downPaymentPercentage: number;
    downPaymentStatus: number;
    downPaymentTrasactionID: string;
    downPaymentType: number;
    downPaymentsToDraw: IDownPaymentsToDraw[];
    eCommerceGSTIN: string;
    eCommerceOperator: string;
    eDocErrorCode: string;
    eDocErrorMessage: string;
    eDocExportFormat: number;
    eDocGenerationType: number;
    eDocNum: string;
    eDocSeries: number;
    eDocStatus: number;
    eTaxNumber: string;
    eTaxWebSite: number;
    elecCommMessage: string;
    elecCommStatus: number;
    endDeliveryDate: Date;
    endDeliveryTime: Date;
    excludeFromTaxReportControlStatementVAT: number;
    exemptionValidityDateFrom: Date;
    exemptionValidityDateTo: Date;
    expenses: IDocumentsAdditionalExpenses[];
    externalCorrectedDocNum: string;
    extraDays: number;
    extraMonth: number;
    federalTaxID: string;
    financialPeriod: number;
    fiscalDocNum: string;
    folioNumber: number;
    folioNumberFrom: number;
    folioNumberTo: number;
    folioPrefixString: string;
    form1099: number;
    gstTransactionType: number;
    gtsChecker: number;
    gtsPayee: number;
    groupHandWritten: number;
    groupNumber: number;
    groupSeries: number;
    handWritten: number;
    importFileNum: number;
    indicator: string;
    installments: IDocument_Installments[];
    insuranceOperation347: number;
    interimType: number;
    internalCorrectedDocNum: number;
    isAlteration: number;
    isPayToBank: number;
    journalMemo: string;
    languageCode: number;
    letter: number;
    lines: IDocument_Lines[];
    manualNumber: string;
    maximumCashDiscount: number;
    ntsApproved: number;
    ntsApprovedNumber: string;
    netProcedure: number;
    nextCorrectingDocument: number;
    numAtCard: string;
    numberOfInstallments: number;
    openForLandedCosts: number;
    openingRemarks: string;
    originalCreditOrDebitDate: Date;
    originalCreditOrDebitNo: string;
    originalRefDate: Date;
    originalRefNo: string;
    posCashierNumber: number;
    posDailySummaryNo: number;
    posEquipmentNumber: string;
    posManufacturerSerialNumber: string;
    posReceiptNo: number;
    poS_CashRegister: number;
    packages: IDocumentPackages[];
    partialSupply: number;
    payToBankAccountNo: string;
    payToBankBranch: string;
    payToBankCode: string;
    payToBankCountry: string;
    payToCode: string;
    paymentBlock: number;
    paymentBlockEntry: number;
    paymentGroupCode: number;
    paymentMethod: string;
    paymentReference: string;
    periodIndicator: string;
    pick: number;
    pickRemark: string;
    pickStatus: number;
    pointOfIssueCode: string;
    printSEPADirect: number;
    printed: number;
    privateKeyVersion: number;
    project: string;
    receiver: number;
    reference1: string;
    reference2: string;
    relatedEntry: number;
    relatedType: number;
    releaser: number;
    relevantToGTS: number;
    reopenManuallyClosedOrCanceledDocument: number;
    reopenOriginalDocument: number;
    reportingSectionControlStatementVAT: string;
    reqType: number;
    requester: string;
    requesterBranch: number;
    requesterDepartment: number;
    requesterEmail: string;
    requesterName: string;
    requriedDate: Date;
    reserve: number;
    reserveInvoice: number;
    reuseDocumentNum: number;
    reuseNotaFiscalNum: number;
    revision: number;
    revisionPo: number;
    rounding: number;
    roundingDiffAmount: number;
    roundingDiffAmountFC: number;
    roundingDiffAmountSC: number;
    salesPersonCode: number;
    segment: number;
    sendNotification: number;
    sequenceCode: number;
    sequenceModel: string;
    sequenceSerial: number;
    series: number;
    seriesString: string;
    serviceGrossProfitPercent: number;
    shipFrom: string;
    shipToCode: string;
    showSCN: number;
    signatureDigest: string;
    signatureInputMessage: string;
    specialLines: IDocument_SpecialLines[];
    specifiedClosingDate: Date;
    startDeliveryDate: Date;
    startDeliveryTime: Date;
    startFrom: number;
    subSeriesString: string;
    submitted: number;
    summeryType: number;
    supplier: string;
    taxDate: Date;
    taxExemptionLetterNum: string;
    taxExtension: ITaxExtension;
    taxInvoiceDate: Date;
    taxInvoiceNo: string;
    totalDiscount: number;
    totalDiscountFC: number;
    totalDiscountSC: number;
    totalEqualizationTax: number;
    totalEqualizationTaxFC: number;
    totalEqualizationTaxSC: number;
    trackingNumber: string;
    transNum: number;
    transportationCode: number;
    updateDate: Date;
    updateTime: Date;
    useCorrectionVATGroup: number;
    useShpdGoodsAct: number;
    userFields: IUserFields;
    vatRegNum: string;
    vatDate: Date;
    vatPercent: number;
    vatSum: number;
    vatSumFc: number;
    vatSumSys: number;
    vehiclePlate: string;
    wtAmount: number;
    wtAmountFC: number;
    wtAmountSC: number;
    wtApplied: number;
    wtAppliedFC: number;
    wtAppliedSC: number;
    wtExemptedAmount: number;
    wtExemptedAmountFC: number;
    wtExemptedAmountSC: number;
    wtNonSubjectAmount: number;
    wtNonSubjectAmountFC: number;
    wtNonSubjectAmountSC: number;
    wareHouseUpdateType: number;
    withholdingTaxData: IWithholdingTaxData[];
    withholdingTaxDataWTX: IWithholdingTaxDataWTX[];
}


export interface IAddressExtension {
    billToAddress2: string;
    billToAddress3: string;
    billToAddressType: string;
    billToBlock: string;
    billToBuilding: string;
    billToCity: string;
    billToCountry: string;
    billToCounty: string;
    billToGlobalLocationNumber: string;
    billToState: string;
    billToStreet: string;
    billToStreetNo: string;
    billToZipCode: string;
    placeOfSupply: string;
    shipToAddress2: string;
    shipToAddress3: string;
    shipToAddressType: string;
    shipToBlock: string;
    shipToBuilding: string;
    shipToCity: string;
    shipToCountry: string;
    shipToCounty: string;
    shipToGlobalLocationNumber: string;
    shipToState: string;
    shipToStreet: string;
    shipToStreetNo: string;
    shipToZipCode: string;
}

export interface IDocument_ApprovalRequests {
    activeForUpdate: number;
    approvalTemplatesID: number;
    approvalTemplatesName: string;
    remarks: string;
}

export interface IDownPaymentsToDraw {
    amountToDraw: number;
    amountToDrawFC: number;
    amountToDrawSC: number;
    details: string;
    docEntry: number;
    docInternalID: number;
    docNumber: number;
    downPaymentType: number;
    downPaymentsToDrawDetails: IDownPaymentsToDrawDetails[];
    dueDate: Date;
    grossAmountToDraw: number;
    grossAmountToDrawFC: number;
    grossAmountToDrawSC: number;
    isGrossLine: number;
    name: string;
    postingDate: Date;
    rowNum: number;
    tax: number;
    taxFC: number;
    taxSC: number;
}

export interface IDownPaymentsToDrawDetails {
    amountToDraw: number;
    amountToDrawFC: number;
    amountToDrawSC: number;
    docEntry: number;
    docInternalID: number;
    grossAmountToDraw: number;
    grossAmountToDrawFC: number;
    grossAmountToDrawSC: number;
    isGrossLine: number;
    lineType: number;
    rowNum: number;
    seqNum: number;
    tax: number;
    taxAdjust: number;
    taxFC: number;
    taxSC: number;
    vatGroupCode: string;
    vatPercent: number;
}

export interface IDocumentsAdditionalExpenses {
    aquisitionTax: number;
    baseDocEntry: number;
    baseDocLine: number;
    baseDocType: number;
    baseDocumentReference: number;
    deductibleTaxSum: number;
    deductibleTaxSumFC: number;
    deductibleTaxSumSys: number;
    distributionMethod: number;
    distributionRule: string;
    distributionRule2: string;
    distributionRule3: string;
    distributionRule4: string;
    distributionRule5: string;
    equalizationTaxFC: number;
    equalizationTaxPercent: number;
    equalizationTaxSum: number;
    equalizationTaxSys: number;
    expenseCode: number;
    lastPurchasePrice: number;
    lineGross: number;
    lineGrossFC: number;
    lineGrossSys: number;
    lineNum: number;
    lineTotal: number;
    lineTotalFC: number;
    lineTotalSys: number;
    paidToDate: number;
    paidToDateFC: number;
    paidToDateSys: number;
    project: string;
    remarks: string;
    status: number;
    stock: number;
    targetAbsEntry: number;
    targetType: number;
    taxCode: string;
    taxJurisdictions: ITaxJurisdictions[];
    taxLiable: number;
    taxPaid: number;
    taxPaidFC: number;
    taxPaidSys: number;
    taxPercent: number;
    taxSum: number;
    taxSumFC: number;
    taxSumSys: number;
    taxTotalSum: number;
    taxTotalSumFC: number;
    taxTotalSumSys: number;
    taxType: number;
    userFields: IUserFields;
    vatGroup: string;
    wtLiable: number;
}

export interface ITaxJurisdictions {
    docEntry: number;
    jurisdictionCode: string;
    jurisdictionType: number;
    lineNumber: number;
    rowSequence: number;
    taxAmount: number;
    taxAmountFC: number;
    taxAmountSC: number;
    taxRate: number;
    userFields: IUserFields;
}

export interface IDocument_Installments {
    dueDate: Date;
    dunningLevel: number;
    installmentId: number;
    lastDunningDate: Date;
    paymentOrdered: number;
    percentage: number;
    total: number;
    totalFC: number;
    userFields: IUserFields;
}

export interface IDocument_Lines {
    accountCode: string;
    actualBaseEntry: number;
    actualBaseLine: number;
    actualDeliveryDate: Date;
    address: string;
    agreementNo: number;
    agreementRowNumber: number;
    appliedTax: number;
    appliedTaxFC: number;
    appliedTaxSC: number;
    backOrder: number;
    barCode: string;
    baseEntry: number;
    baseLine: number;
    baseOpenQuantity: number;
    baseType: number;
    batchNumbers: IBatchNumbers[];
    binAllocations: IDocumentLinesBinAllocations[];
    cfopCode: string;
    cogsAccountCode: string;
    cogsCostingCode: string;
    cogsCostingCode2: string;
    cogsCostingCode3: string;
    cogsCostingCode4: string;
    cogsCostingCode5: string;
    cstCode: string;
    csTforCOFINS: string;
    csTforIPI: string;
    csTforPIS: string;
    changeAssemlyBoMWarehouse: string;
    changeInventoryQuantityIndependently: number;
    commisionPercent: number;
    considerQuantity: number;
    consumerSalesForecast: number;
    corrInvAmountToDiffAcct: number;
    corrInvAmountToStock: number;
    correctionInvoiceItem: number;
    costingCode: string;
    costingCode2: string;
    costingCode3: string;
    costingCode4: string;
    costingCode5: string;
    countryOrg: string;
    creditOriginCode: string;
    currency: string;
    defectAndBreakup: number;
    deferredTax: number;
    discountPercent: number;
    distributeExpense: number;
    docEntry: number;
    enableReturnCost: number;
    equalizationTaxPercent: number;
    exLineNo: string;
    exciseAmount: number;
    expenseOperationType: number;
    expenseType: string;
    expenses: IDocument_LinesAdditionalExpenses[];
    factor1: number;
    factor2: number;
    factor3: number;
    factor4: number;
    federalTaxID: string;
    freeOfChargeBP: number;
    freeText: string;
    generatedAssets: IGeneratedAssets[];
    grossBase: number;
    grossBuyPrice: number;
    grossProfitTotalBasePrice: number;
    height1: number;
    height2: number;
    height2Unit: number;
    hight1Unit: number;
    incoterms: number;
    inventoryQuantity: number;
    itemCode: string;
    itemDescription: string;
    itemDetails: string;
    itemType: number;
    lastBuyDistributeSum: number;
    lastBuyDistributeSumFc: number;
    lastBuyDistributeSumSc: number;
    lastBuyInmPrice: number;
    lengh1: number;
    lengh1Unit: number;
    lengh2: number;
    lengh2Unit: number;
    lineNum: number;
    lineStatus: number;
    lineTotal: number;
    lineType: number;
    lineVendor: string;
    locationCode: number;
    measureUnit: string;
    netTaxAmount: number;
    netTaxAmountFC: number;
    netTaxAmountSC: number;
    openAmount: number;
    openAmountFC: number;
    openAmountSC: number;
    originalItem: string;
    poTargetEntry: string;
    poTargetNum: number;
    poTargetRowNum: string;
    packageQuantity: number;
    parentLineNum: number;
    partialRetirement: number;
    pickListIdNumber: number;
    pickQuantity: number;
    pickStatus: number;
    pickStatusEx: number;
    price: number;
    priceAfterVAT: number;
    projectCode: string;
    quantity: number;
    rate: number;
    receiptNumber: string;
    remainingOpenInventoryQuantity: number;
    remainingOpenQuantity: number;
    requiredDate: Date;
    requiredQuantity: number;
    retirementAPC: number;
    retirementQuantity: number;
    returnCost: number;
    rowTotalFC: number;
    rowTotalSC: number;
    sacEntry: number;
    sww: string;
    salesPersonCode: number;
    serialNum: string;
    serialNumbers: ISerialNumbers[];
    shipDate: Date;
    shipToCode: string;
    shipToDescription: string;
    shippingMethod: number;
    shortages: number;
    stockDistributesum: number;
    stockDistributesumForeign: number;
    stockDistributesumSystem: number;
    stockInmPrice: number;
    supplierCatNum: string;
    surpluses: number;
    taxBeforeDPM: number;
    taxBeforeDPMFC: number;
    taxBeforeDPMSC: number;
    taxCode: string;
    taxJurisdictions: ITaxJurisdictions[];
    taxLiable: number;
    taxOnly: number;
    taxPerUnit: number;
    taxPercentagePerRow: number;
    taxTotal: number;
    taxType: number;
    text: string;
    thirdParty: number;
    totalEqualizationTax: number;
    totalEqualizationTaxFC: number;
    totalEqualizationTaxSC: number;
    totalInclTax: number;
    transactionType: number;
    transportMode: number;
    treeType: number;
    unitPrice: number;
    unitsOfMeasurment: number;
    uoMCode: string;
    uoMEntry: number;
    usage: string;
    useBaseUnits: number;
    userFields: IUserFields;
    vatGroup: string;
    vendorNum: string;
    visualOrder: number;
    volume: number;
    volumeUnit: number;
    wtLiable: number;
    warehouseCode: string;
    weight1: number;
    weight1Unit: number;
    weight2: number;
    weight2Unit: number;
    width1: number;
    width1Unit: number;
    width2: number;
    width2Unit: number;
    withholdingTaxLines: IWithholdingTaxLines[];
    withoutInventoryMovement: number;
}

export interface IBatchNumbers {
    addmisionDate: Date;
    baseLineNumber: number;
    batchNumber: string;
    expiryDate: Date;
    internalSerialNumber: string;
    location: string;
    manufacturerSerialNumber: string;
    manufacturingDate: Date;
    notes: string;
    quantity: number;
    trackingNote: number;
    trackingNoteLine: number;
    userFields: IUserFields;
}

export interface IDocumentLinesBinAllocations {
    allowNegativeQuantity: number;
    baseLineNumber: number;
    binAbsEntry: number;
    quantity: number;
    serialAndBatchNumbersBaseLine: number;
}

export interface IDocument_LinesAdditionalExpenses {
    aquisitionTax: number;
    baseGroup: number;
    deductibleTaxSum: number;
    deductibleTaxSumFC: number;
    deductibleTaxSumSys: number;
    distributionRule: string;
    distributionRule2: string;
    distributionRule3: string;
    distributionRule4: string;
    distributionRule5: string;
    equalizationTaxFC: number;
    equalizationTaxPercent: number;
    equalizationTaxSum: number;
    equalizationTaxSys: number;
    expenseCode: number;
    groupCode: number;
    lineNumber: number;
    lineTotal: number;
    lineTotalFC: number;
    lineTotalSys: number;
    paidToDate: number;
    paidToDateFC: number;
    paidToDateSys: number;
    project: string;
    taxCode: string;
    taxJurisdictions: ITaxJurisdictions[];
    taxLiable: number;
    taxPaid: number;
    taxPaidFC: number;
    taxPaidSys: number;
    taxPercent: number;
    taxSum: number;
    taxSumFC: number;
    taxSumSys: number;
    taxTotalSum: number;
    taxTotalSumFC: number;
    taxTotalSumSys: number;
    taxType: number;
    userFields: IUserFields;
    vatGroup: string;
    wtLiable: number;
}

export interface ITaxJurisdictions {
    docEntry: number;
    jurisdictionCode: string;
    jurisdictionType: number;
    lineNumber: number;
    rowSequence: number;
    taxAmount: number;
    taxAmountFC: number;
    taxAmountSC: number;
    taxRate: number;
    userFields: IUserFields;
}

export interface IGeneratedAssets {
    amount: number;
    amountSC: number;
    assetCode: string;
    docEntry: number;
    lineNumber: number;
    remarks: string;
    serialNumber: string;
    status: number;
    visOrder: number;
}

export interface ISerialNumbers {
    baseLineNumber: number;
    batchID: string;
    expiryDate: Date;
    internalSerialNumber: string;
    location: string;
    manufactureDate: Date;
    manufacturerSerialNumber: string;
    notes: string;
    quantity: number;
    receptionDate: Date;
    systemSerialNumber: number;
    trackingNote: number;
    trackingNoteLine: number;
    userFields: IUserFields;
    warrantyEnd: Date;
    warrantyStart: Date;
}

export interface ITaxJurisdictions {
    docEntry: number;
    jurisdictionCode: string;
    jurisdictionType: number;
    lineNumber: number;
    rowSequence: number;
    taxAmount: number;
    taxAmountFC: number;
    taxAmountSC: number;
    taxRate: number;
    userFields: IUserFields;
}

export interface IWithholdingTaxLines {
    baseDocEntry: number;
    baseDocLine: number;
    baseDocType: number;
    baseType: string;
    cstCodeIncoming: string;
    cstCodeOutgoing: string;
    category: string;
    criteria: string;
    glAccount: string;
    lineNum: number;
    rate: number;
    roundingType: string;
    taxableAmount: number;
    taxableAmountFC: number;
    taxableAmountinSys: number;
    userFields: IUserFields;
    wtAmount: number;
    wtAmountFC: number;
    wtAmountSys: number;
    wtCode: string;
    withholdingType: string;
}

export interface IDocumentPackages {
    items: IDocumentPackageItems[];
    number: number;
    totalWeight: number;
    type: string;
    units: number;
    userFields: IUserFields;
}

export interface IDocumentPackageItems {
    itemCode: string;
    measureUnit: string;
    quantity: number;
    unitsOfMeasurement: number;
    uoMEntry: number;
    userFields: IUserFields;
}

export interface IDocument_SpecialLines {
    afterLineNumber: number;
    freight1: number;
    freight1FC: number;
    freight1SC: number;
    freight2: number;
    freight2FC: number;
    freight2SC: number;
    freight3: number;
    freight3FC: number;
    freight3SC: number;
    grossTotal: number;
    grossTotalFC: number;
    grossTotalSC: number;
    lineNum: number;
    lineText: string;
    lineType: number;
    orderNumber: number;
    subtotal: number;
    subtotalFC: number;
    subtotalSC: number;
    taxAmount: number;
    taxAmountFC: number;
    taxAmountSC: number;
}

export interface ITaxExtension {
    billOfEntryDate: Date;
    billOfEntryNo: string;
    blockB: string;
    blockS: string;
    brand: string;
    buildingB: string;
    buildingS: string;
    carrier: string;
    cityB: string;
    cityS: string;
    countryB: string;
    countryS: string;
    county: string;
    countyB: string;
    countyS: string;
    globalLocationNumberB: string;
    globalLocationNumberS: string;
    grossWeight: number;
    importOrExport: number;
    incoterms: string;
    mainUsage: number;
    nfRef: string;
    netWeight: number;
    originalBillOfEntryDate: Date;
    originalBillOfEntryNo: string;
    packDescription: string;
    packQuantity: number;
    shipUnitNo: number;
    state: string;
    stateB: string;
    stateS: string;
    streetB: string;
    streetS: string;
    taxId0: string;
    taxId1: string;
    taxId12: string;
    taxId13: string;
    taxId2: string;
    taxId3: string;
    taxId4: string;
    taxId5: string;
    taxId6: string;
    taxId7: string;
    taxId8: string;
    taxId9: string;
    userFields: IUserFields;
    vehicle: string;
    vehicleState: string;
    zipCodeB: string;
    zipCodeS: string;
}

export interface IWithholdingTaxData {
    baseDocEntry: number;
    baseDocLine: number;
    baseDocType: number;
    baseDocumentReference: number;
    baseType: string;
    category: string;
    criteria: string;
    glAccount: string;
    lineNum: number;
    rate: number;
    roundingType: string;
    status: number;
    targetAbsEntry: number;
    targetDocumentType: number;
    taxableAmount: number;
    taxableAmountFC: number;
    taxableAmountinSys: number;
    userFields: IUserFields;
    wtAmount: number;
    wtAmountFC: number;
    wtAmountSys: number;
    wtCode: string;
    withholdingType: string;
}

export interface IWithholdingTaxDataWTX {
    accumBaseAmount: number;
    accumBaseAmountFC: number;
    accumBaseAmountSys: number;
    accumWTaxAmount: number;
    accumWTaxAmountFC: number;
    accumWTaxAmountSys: number;
    baseDocEntry: number;
    baseDocLine: number;
    baseDocType: number;
    baseDocumentReference: number;
    baseNetAmount: number;
    baseNetAmountFC: number;
    baseNetAmountSys: number;
    baseType: string;
    baseVatAmount: number;
    baseVatAmountFC: number;
    baseVatAmountSys: number;
    category: string;
    criteria: string;
    exemptRate: number;
    glAccount: string;
    lineNum: number;
    rate: number;
    roundingType: string;
    status: number;
    targetAbsEntry: number;
    targetDocumentType: number;
    taxableAmount: number;
    taxableAmountFC: number;
    taxableAmountinSys: number;
    userFields: IUserFields;
    wtAbsId: string;
    wtAmount: number;
    wtAmountFC: number;
    wtAmountSys: number;
    wtCode: string;
    withholdingType: string;
}

