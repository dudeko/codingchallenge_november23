package com.eduardominarelli.employmentcontractmanager.service;

import com.eduardominarelli.employmentcontractmanager.model.IdentifiableEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DataAccessService {

    <T extends IdentifiableEntity> List<T> retrieveAll(Class<T> objectClass) throws IOException;

    <T extends IdentifiableEntity> T save(T object) throws IOException;

    void uploadFiles(List<MultipartFile> multipartFileList, String folderName);
}
