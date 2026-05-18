package com.allmatrimony.backend.service;

import com.allmatrimony.backend.dto.ApiResponse;
import com.allmatrimony.backend.dto.ProfileUpdateRequest;
import com.allmatrimony.backend.dto.StatusUpdateRequest;
import com.allmatrimony.backend.dto.VerificationSubmitRequest;
import com.allmatrimony.backend.entity.AdminNotification;
import com.allmatrimony.backend.entity.ApprovalRequest;
import com.allmatrimony.backend.entity.User;
import com.allmatrimony.backend.entity.VerificationRequest;
import com.allmatrimony.backend.repository.AdminNotificationRepository;
import com.allmatrimony.backend.repository.ApprovalRequestRepository;
import com.allmatrimony.backend.repository.UserRepository;
import com.allmatrimony.backend.repository.VerificationRequestRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MatrimonyService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MatrimonyService.class);

    private final UserRepository userRepository;
    private final ApprovalRequestRepository approvalRequestRepository;
    private final VerificationRequestRepository verificationRequestRepository;
    private final AdminNotificationRepository notificationRepository;

    public MatrimonyService(
            UserRepository userRepository,
            ApprovalRequestRepository approvalRequestRepository,
            VerificationRequestRepository verificationRequestRepository,
            AdminNotificationRepository notificationRepository
    ) {
        this.userRepository = userRepository;
        this.approvalRequestRepository = approvalRequestRepository;
        this.verificationRequestRepository = verificationRequestRepository;
        this.notificationRepository = notificationRepository;
    }

    public ApiResponse getUserProfile(Long userId) {
        User user = getUser(userId);
        return ApiResponse.success("Profile loaded.", mapUser(user));
    }

    public ApiResponse getApprovedProfiles() {
        List<Map<String, Object>> profiles = userRepository.findAll().stream()
                .filter(user -> "Approved".equalsIgnoreCase(user.getApprovalStatus()))
                .map(this::mapUser)
                .collect(Collectors.toList());
        return ApiResponse.success("Approved profiles loaded.", profiles);
    }

    public ApiResponse getAllUsers() {
        List<Map<String, Object>> users = userRepository.findAll().stream()
                .map(this::mapUser)
                .collect(Collectors.toList());
        return ApiResponse.success("Users loaded.", users);
    }

    @Transactional
    public ApiResponse updateProfile(Long userId, ProfileUpdateRequest request) {
        User user = getUser(userId);
        normalizeUserDefaults(user);
        validateProfileUpdate(user, request);

        applyProfileUpdates(user, request);
        user.setApprovalStatus("Pending");
        userRepository.save(user);

        ApprovalRequest approvalRequest = createOrRefreshApprovalRequest(user);
        createNotification(
                "ADMIN",
                null,
                "PROFILE_APPROVAL_REQUEST",
                "New Profile Approval Request",
                user.getName() + " profile approval kosam submit chesaru.",
                approvalRequest.getId()
        );
        createNotification(
                "USER",
                user.getId(),
                "PROFILE_SUBMITTED",
                "Profile Sent to Admin",
                "Mee profile admin approval kosam send ayindi. Admin approve chesthe notification vastundi.",
                approvalRequest.getId()
        );

        Map<String, Object> data = new LinkedHashMap<>();
        data.put("profile", mapUser(user));
        data.put("approvalRequest", mapApprovalRequest(approvalRequest));
        return ApiResponse.success("Profile saved and sent for approval.", data);
    }

    public ApiResponse getApprovalRequests() {
        List<Map<String, Object>> requests = approvalRequestRepository.findAllByOrderBySubmittedAtDesc()
                .stream()
                .map(this::mapApprovalRequest)
                .collect(Collectors.toList());
        return ApiResponse.success("Approval requests loaded.", requests);
    }

    @Transactional
    public ApiResponse approveProfile(Long requestId, StatusUpdateRequest request) {
        ApprovalRequest approvalRequest = approvalRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Approval request not found."));
        User user = getUser(approvalRequest.getUserId());

        approvalRequest.setStatus("Approved");
        approvalRequest.setAdminMessage(defaultMessage(request.getAdminMessage(),
                "Congratulations! Mee profile admin approve chesaru."));
        approvalRequest.setApprovedAt(LocalDateTime.now());
        approvalRequest.setRejectedAt(null);
        approvalRequestRepository.save(approvalRequest);

        user.setApprovalStatus("Approved");
        userRepository.save(user);

        createNotification(
                "USER",
                user.getId(),
                "PROFILE_APPROVED",
                "Profile Approved",
                approvalRequest.getAdminMessage(),
                approvalRequest.getId()
        );

        return ApiResponse.success("Profile approved successfully.", mapApprovalRequest(approvalRequest));
    }

    @Transactional
    public ApiResponse rejectProfile(Long requestId, StatusUpdateRequest request) {
        ApprovalRequest approvalRequest = approvalRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Approval request not found."));
        User user = getUser(approvalRequest.getUserId());

        approvalRequest.setStatus("Rejected");
        approvalRequest.setAdminMessage(defaultMessage(request.getAdminMessage(),
                "Mee profile admin reject chesaru. Please details correct chesi malli submit cheyyandi."));
        approvalRequest.setRejectedAt(LocalDateTime.now());
        approvalRequest.setApprovedAt(null);
        approvalRequestRepository.save(approvalRequest);

        user.setApprovalStatus("Rejected");
        userRepository.save(user);

        createNotification(
                "USER",
                user.getId(),
                "PROFILE_REJECTED",
                "Profile Rejected",
                approvalRequest.getAdminMessage(),
                approvalRequest.getId()
        );

        return ApiResponse.success("Profile rejected successfully.", mapApprovalRequest(approvalRequest));
    }

    @Transactional
    public ApiResponse submitVerificationRequest(Long userId, VerificationSubmitRequest request) {
        User user = getUser(userId);

        if (verificationRequestRepository.existsByUserIdAndStatus(userId, "Pending")) {
            VerificationRequest existingRequest = verificationRequestRepository
                    .findTopByUserIdOrderBySubmittedAtDesc(userId)
                    .orElseThrow(() -> new IllegalArgumentException("Your verification request is already pending."));
            return ApiResponse.success("Your verification request is already pending.", mapVerificationRequest(existingRequest));
        }

        VerificationRequest verificationRequest = new VerificationRequest();
        verificationRequest.setUserId(userId);
        verificationRequest.setProfileName(user.getName());
        verificationRequest.setGender(user.getGender());
        verificationRequest.setAge(user.getAge());
        verificationRequest.setPhone(user.getPhone());
        verificationRequest.setEmail(user.getEmail());
        verificationRequest.setCommunity(user.getCommunity());
        verificationRequest.setReligion(user.getReligion());
        verificationRequest.setCaste(user.getCaste());
        verificationRequest.setLocation(user.getLocation());
        verificationRequest.setEducation(user.getEducation());
        verificationRequest.setJob(user.getJob());
        verificationRequest.setImage(user.getImage());
        verificationRequest.setAadhaarNumber(request.getIdNumber());
        verificationRequest.setAddress(request.getAddressProof());
        verificationRequest.setEducationProof(request.getEducationProof());
        verificationRequest.setJobProof(request.getJobProof());
        verificationRequest.setFamilyContact(request.getFamilyContact());
        verificationRequest.setCharacterVerification(request.getCharacterVerification());
        verificationRequest.setMaritalProof(request.getMaritalProof());
        verificationRequest.setStatus("Pending");
        verificationRequest.setAdminMessage("");
        verificationRequest.setSubmittedAt(LocalDateTime.now());
        verificationRequestRepository.save(verificationRequest);

        user.setVerificationStatus("Pending");
        userRepository.save(user);

        createNotification(
                "USER",
                userId,
                "VERIFICATION_SUBMITTED",
                "Verification Submitted",
                "Mee background verification request admin ki send ayindi. Admin approve/reject chesthe notification vastundi.",
                verificationRequest.getId()
        );
        createNotification(
                "ADMIN",
                null,
                "VERIFICATION_REQUEST",
                "New Background Verification Request",
                user.getName() + " background verification kosam request pampaaru.",
                verificationRequest.getId()
        );

        return ApiResponse.success("Verification request sent to admin.", mapVerificationRequest(verificationRequest));
    }

    public ApiResponse getVerificationRequests() {
        List<Map<String, Object>> requests = verificationRequestRepository.findAllByOrderBySubmittedAtDesc()
                .stream()
                .map(this::mapVerificationRequest)
                .collect(Collectors.toList());
        return ApiResponse.success("Verification requests loaded.", requests);
    }

    @Transactional
    public ApiResponse updateVerificationStatus(Long requestId, String status, StatusUpdateRequest request) {
        VerificationRequest verificationRequest = verificationRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Verification request not found."));
        User user = getUser(verificationRequest.getUserId());

        verificationRequest.setStatus(status);
        verificationRequest.setAdminMessage(defaultMessage(
                request.getAdminMessage(),
                "Approved".equals(status)
                        ? "Congratulations! Mee background verification admin approve chesaru."
                        : "Mee background verification admin reject chesaru. Details correct chesi malli submit cheyyandi."
        ));
        if ("Approved".equals(status)) {
            verificationRequest.setApprovedAt(LocalDateTime.now());
            verificationRequest.setRejectedAt(null);
        } else {
            verificationRequest.setRejectedAt(LocalDateTime.now());
            verificationRequest.setApprovedAt(null);
        }
        verificationRequestRepository.save(verificationRequest);

        user.setVerificationStatus(status);
        userRepository.save(user);

        createNotification(
                "USER",
                user.getId(),
                "Approved".equals(status) ? "VERIFICATION_APPROVED" : "VERIFICATION_REJECTED",
                "Background Verification " + status,
                verificationRequest.getAdminMessage(),
                verificationRequest.getId()
        );

        return ApiResponse.success("Verification " + status + ".", mapVerificationRequest(verificationRequest));
    }

    public ApiResponse getUserVerificationRequests(Long userId) {
        List<Map<String, Object>> requests = verificationRequestRepository.findByUserIdOrderBySubmittedAtDesc(userId)
                .stream()
                .map(this::mapVerificationRequest)
                .collect(Collectors.toList());
        return ApiResponse.success("User verification requests loaded.", requests);
    }

    public ApiResponse getUserNotifications(Long userId) {
        List<Map<String, Object>> notifications = notificationRepository
                .findByAudienceAndUserIdOrderByCreatedAtDesc("USER", userId)
                .stream()
                .map(this::mapNotification)
                .collect(Collectors.toList());
        return ApiResponse.success("Notifications loaded.", notifications);
    }

    public ApiResponse getAdminNotifications() {
        List<Map<String, Object>> notifications = notificationRepository
                .findByAudienceOrderByCreatedAtDesc("ADMIN")
                .stream()
                .map(this::mapNotification)
                .collect(Collectors.toList());
        return ApiResponse.success("Admin notifications loaded.", notifications);
    }

    @Transactional
    public ApiResponse markNotificationRead(Long notificationId) {
        AdminNotification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found."));
        notification.setReadStatus(true);
        notificationRepository.save(notification);
        return ApiResponse.success("Notification marked as read.");
    }

    private void applyProfileUpdates(User user, ProfileUpdateRequest request) {
        user.setName(valueOrDefault(request.getName(), user.getName()));
        user.setGender(valueOrDefault(request.getGender(), user.getGender()));
        user.setAge(valueOrDefault(request.getAge(), user.getAge()));
        user.setDob(valueOrDefault(request.getDob(), user.getDob()));
        user.setPhone(valueOrDefault(request.getPhone(), user.getPhone()));
        user.setEmail(valueOrDefault(request.getEmail(), user.getEmail()));
        user.setCommunity(valueOrDefault(request.getCommunity(), user.getCommunity()));
        user.setReligion(valueOrDefault(request.getReligion(), user.getReligion()));
        user.setCaste(valueOrDefault(request.getCaste(), user.getCaste()));
        user.setLocation(valueOrDefault(request.getLocation(), user.getLocation()));
        user.setEducation(valueOrDefault(request.getEducation(), user.getEducation()));
        user.setJob(valueOrDefault(request.getJob(), user.getJob()));
        user.setIncome(valueOrDefault(request.getIncome(), user.getIncome()));
        user.setHeight(valueOrDefault(request.getHeight(), user.getHeight()));
        user.setMaritalStatus(valueOrDefault(request.getMaritalStatus(), user.getMaritalStatus()));
        user.setFamilyType(valueOrDefault(request.getFamilyType(), user.getFamilyType()));
        user.setFatherName(valueOrDefault(request.getFatherName(), user.getFatherName()));
        user.setMotherName(valueOrDefault(request.getMotherName(), user.getMotherName()));
        user.setSiblings(valueOrDefault(request.getSiblings(), user.getSiblings()));
        user.setAbout(valueOrDefault(request.getAbout(), user.getAbout()));
        user.setPartnerAge(valueOrDefault(request.getPartnerAge(), user.getPartnerAge()));
        user.setPartnerCommunity(valueOrDefault(request.getPartnerCommunity(), user.getPartnerCommunity()));
        user.setPartnerLocation(valueOrDefault(request.getPartnerLocation(), user.getPartnerLocation()));
        user.setPartnerEducation(valueOrDefault(request.getPartnerEducation(), user.getPartnerEducation()));
        user.setImage(valueOrDefault(request.getImage(), user.getImage()));
        user.setHabits(valueOrDefault(request.getHabits(), user.getHabits()));
        user.setProfileCompletion(request.getProfileCompletion() == null ? user.getProfileCompletion() : request.getProfileCompletion());
    }

    private ApprovalRequest createOrRefreshApprovalRequest(User user) {
        ApprovalRequest request = approvalRequestRepository.findTopByUserIdOrderBySubmittedAtDesc(user.getId())
                .orElse(new ApprovalRequest());
        request.setUserId(user.getId());
        request.setProfileName(user.getName());
        request.setGender(user.getGender());
        request.setAge(user.getAge());
        request.setPhone(user.getPhone());
        request.setEmail(user.getEmail());
        request.setCommunity(user.getCommunity());
        request.setReligion(user.getReligion());
        request.setCaste(user.getCaste());
        request.setLocation(user.getLocation());
        request.setEducation(user.getEducation());
        request.setJob(user.getJob());
        request.setIncome(user.getIncome());
        request.setHeight(user.getHeight());
        request.setImage(user.getImage());
        request.setStatus("Pending");
        request.setAdminMessage("");
        request.setSubmittedAt(LocalDateTime.now());
        request.setApprovedAt(null);
        request.setRejectedAt(null);
        return approvalRequestRepository.save(request);
    }

    private void createNotification(String audience, Long userId, String type, String title, String message, Long requestId) {
        try {
            AdminNotification notification = new AdminNotification();
            notification.setAudience(audience);
            notification.setUserId(userId);
            notification.setType(type);
            notification.setTitle(title);
            notification.setMessage(message);
            notification.setRequestId(requestId);
            notification.setReadStatus(false);
            notification.setCreatedAt(LocalDateTime.now());
            notificationRepository.save(notification);
        } catch (Exception ex) {
            LOGGER.error("Failed to save notification for audience {}", audience, ex);
        }
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
    }

    private void normalizeUserDefaults(User user) {
        if (isBlank(user.getApprovalStatus())) {
            user.setApprovalStatus("Not Submitted");
        }

        if (isBlank(user.getVerificationStatus())) {
            user.setVerificationStatus("Not Submitted");
        }

        if (user.getProfileCompletion() == null) {
            user.setProfileCompletion(25);
        }

        if (isBlank(user.getMaritalStatus())) {
            user.setMaritalStatus("Never Married");
        }

        if (isBlank(user.getImage())) {
            user.setImage("https://randomuser.me/api/portraits/men/10.jpg");
        }
    }

    private void validateProfileUpdate(User user, ProfileUpdateRequest request) {
        String nextName = valueOrDefault(request.getName(), user.getName());
        String nextPhone = valueOrDefault(request.getPhone(), user.getPhone());
        String nextEmail = valueOrDefault(request.getEmail(), user.getEmail());
        String nextGender = valueOrDefault(request.getGender(), user.getGender());
        String nextCommunity = valueOrDefault(request.getCommunity(), user.getCommunity());
        String nextLocation = valueOrDefault(request.getLocation(), user.getLocation());

        if (isBlank(nextName)) {
            throw new IllegalArgumentException("Name is required.");
        }

        if (isBlank(nextPhone)) {
            throw new IllegalArgumentException("Phone number is required.");
        }

        if (isBlank(nextEmail)) {
            throw new IllegalArgumentException("Email is required.");
        }

        if (isBlank(nextGender)) {
            throw new IllegalArgumentException("Gender is required.");
        }

        if (isBlank(nextCommunity)) {
            throw new IllegalArgumentException("Community is required.");
        }

        if (isBlank(nextLocation)) {
            throw new IllegalArgumentException("Location is required.");
        }

        if (!nextEmail.equalsIgnoreCase(user.getEmail())
                && userRepository.existsByEmailAndIdNot(nextEmail, user.getId())) {
            throw new IllegalArgumentException("This email is already used by another account.");
        }

        if (!nextPhone.equals(user.getPhone())
                && userRepository.existsByPhoneAndIdNot(nextPhone, user.getId())) {
            throw new IllegalArgumentException("This phone number is already used by another account.");
        }
    }

    private String valueOrDefault(String value, String fallback) {
        return value == null ? fallback : value;
    }

    private String defaultMessage(String incoming, String fallback) {
        return incoming == null || incoming.isBlank() ? fallback : incoming;
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private Map<String, Object> mapUser(User user) {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("id", user.getId());
        data.put("name", user.getName());
        data.put("gender", user.getGender());
        data.put("age", user.getAge());
        data.put("dob", user.getDob());
        data.put("phone", user.getPhone());
        data.put("email", user.getEmail());
        data.put("community", user.getCommunity());
        data.put("religion", user.getReligion());
        data.put("caste", user.getCaste());
        data.put("location", user.getLocation());
        data.put("education", user.getEducation());
        data.put("job", user.getJob());
        data.put("income", user.getIncome());
        data.put("height", user.getHeight());
        data.put("maritalStatus", user.getMaritalStatus());
        data.put("familyType", user.getFamilyType());
        data.put("fatherName", user.getFatherName());
        data.put("motherName", user.getMotherName());
        data.put("siblings", user.getSiblings());
        data.put("about", user.getAbout());
        data.put("partnerAge", user.getPartnerAge());
        data.put("partnerCommunity", user.getPartnerCommunity());
        data.put("partnerLocation", user.getPartnerLocation());
        data.put("partnerEducation", user.getPartnerEducation());
        data.put("image", user.getImage());
        data.put("habits", user.getHabits());
        data.put("phoneVerified", user.isPhoneVerified());
        data.put("approvalStatus", user.getApprovalStatus());
        data.put("verificationStatus", user.getVerificationStatus());
        data.put("profileCompletion", user.getProfileCompletion());
        return data;
    }

    private Map<String, Object> mapApprovalRequest(ApprovalRequest request) {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("id", request.getId());
        data.put("userId", request.getUserId());
        data.put("profileName", request.getProfileName());
        data.put("gender", request.getGender());
        data.put("age", request.getAge());
        data.put("phone", request.getPhone());
        data.put("email", request.getEmail());
        data.put("community", request.getCommunity());
        data.put("religion", request.getReligion());
        data.put("caste", request.getCaste());
        data.put("location", request.getLocation());
        data.put("education", request.getEducation());
        data.put("job", request.getJob());
        data.put("income", request.getIncome());
        data.put("height", request.getHeight());
        data.put("image", request.getImage());
        data.put("status", request.getStatus());
        data.put("adminMessage", request.getAdminMessage());
        data.put("submittedAt", request.getSubmittedAt() == null ? null : request.getSubmittedAt().toString());
        return data;
    }

    private Map<String, Object> mapVerificationRequest(VerificationRequest request) {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("id", request.getId());
        data.put("userId", request.getUserId());
        data.put("profileName", request.getProfileName());
        data.put("gender", request.getGender());
        data.put("age", request.getAge());
        data.put("phone", request.getPhone());
        data.put("email", request.getEmail());
        data.put("community", request.getCommunity());
        data.put("religion", request.getReligion());
        data.put("caste", request.getCaste());
        data.put("location", request.getLocation());
        data.put("education", request.getEducation());
        data.put("job", request.getJob());
        data.put("image", request.getImage());
        data.put("aadhaarNumber", request.getAadhaarNumber());
        data.put("address", request.getAddress());
        data.put("educationProof", request.getEducationProof());
        data.put("jobProof", request.getJobProof());
        data.put("familyContact", request.getFamilyContact());
        data.put("characterVerification", request.getCharacterVerification());
        data.put("maritalProof", request.getMaritalProof());
        data.put("status", request.getStatus());
        data.put("adminMessage", request.getAdminMessage());
        data.put("submittedAt", request.getSubmittedAt() == null ? null : request.getSubmittedAt().toString());
        return data;
    }

    private Map<String, Object> mapNotification(AdminNotification notification) {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("id", notification.getId());
        data.put("to", "ADMIN".equals(notification.getAudience()) ? "admin" : "user");
        data.put("userId", notification.getUserId());
        data.put("type", notification.getType());
        data.put("title", notification.getTitle());
        data.put("message", notification.getMessage());
        data.put("requestId", notification.getRequestId());
        data.put("read", notification.isReadStatus());
        data.put("createdAt", notification.getCreatedAt() == null ? null : notification.getCreatedAt().toString());
        return data;
    }
}
