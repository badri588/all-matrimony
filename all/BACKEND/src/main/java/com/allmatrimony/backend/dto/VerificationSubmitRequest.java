package com.allmatrimony.backend.dto;

public class VerificationSubmitRequest {
    private String idNumber;
    private String addressProof;
    private String educationProof;
    private String jobProof;
    private String familyContact;
    private String characterVerification;
    private String maritalProof;

    public String getIdNumber() { return idNumber; }
    public void setIdNumber(String idNumber) { this.idNumber = idNumber; }
    public String getAddressProof() { return addressProof; }
    public void setAddressProof(String addressProof) { this.addressProof = addressProof; }
    public String getEducationProof() { return educationProof; }
    public void setEducationProof(String educationProof) { this.educationProof = educationProof; }
    public String getJobProof() { return jobProof; }
    public void setJobProof(String jobProof) { this.jobProof = jobProof; }
    public String getFamilyContact() { return familyContact; }
    public void setFamilyContact(String familyContact) { this.familyContact = familyContact; }
    public String getCharacterVerification() { return characterVerification; }
    public void setCharacterVerification(String characterVerification) { this.characterVerification = characterVerification; }
    public String getMaritalProof() { return maritalProof; }
    public void setMaritalProof(String maritalProof) { this.maritalProof = maritalProof; }
}
