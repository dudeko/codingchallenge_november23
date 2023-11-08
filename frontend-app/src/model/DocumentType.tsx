const DocumentType = {
    CONTRACT: 'CONTRACT',
    CPF_RG: 'CPF_RG',
    PROOF_OF_ADDRESS: 'PROOF_OF_ADDRESS',
    SCHOOL_CURRICULUM: 'SCHOOL_CURRICULUM'
}

export const getLabel = (documentType: string) => {
    return {
        [DocumentType.CONTRACT]: 'Contract',
        [DocumentType.CPF_RG]: 'CPF/RG',
        [DocumentType.PROOF_OF_ADDRESS]: 'Proof of Address',
        [DocumentType.SCHOOL_CURRICULUM]: 'School Curriculum',
    }[documentType]
}

export default DocumentType