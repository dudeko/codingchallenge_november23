package com.eduardominarelli.employmentcontractmanager.service;

import com.eduardominarelli.employmentcontractmanager.model.IdentifiableEntity;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.MismatchedInputException;
import com.fasterxml.jackson.databind.json.JsonMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class DataAccessServiceImpl implements DataAccessService {

    public static final String SRC_MAIN_RESOURCES = "src/main/resources/";
    public static final String DATASTORE_FOLDER = SRC_MAIN_RESOURCES + "datastore/";
    public static final String UPLOAD_FOLDER = SRC_MAIN_RESOURCES + "upload/";

    @Override
    public <T extends IdentifiableEntity> List<T> retrieveAll(Class<T> objectClass) throws IOException {
        ObjectMapper objectMapper = JsonMapper.builder().findAndAddModules().build();
        JavaType javaType = objectMapper.getTypeFactory().constructCollectionType(List.class, objectClass);
        try {
            return objectMapper.readValue(createOrRetrieveFileBasedOnClassName(objectClass), javaType);
        } catch (MismatchedInputException exception) {
            if (exception.getMessage().contains("No content to map due to end-of-input")) {
                return new ArrayList<>();
            }
            throw exception;
        }
    }

    private <T extends IdentifiableEntity> File createOrRetrieveFileBasedOnClassName(Class<T> objectClass) throws IOException {
        return createOrRetrieve(DATASTORE_FOLDER + objectClass.getSimpleName() + ".json");
    }

    @Override
    @SuppressWarnings("unchecked")
    public <T extends IdentifiableEntity> T save(T object) throws IOException {
        List<T> updatedList = retrieveAll(object.getClass()).stream()
                                           .filter(item -> object.getClass().isInstance(item))
                                           .map(item -> (T) item)
                                           .collect(toList());
        object.setId(getNextId(updatedList));
        updatedList.add(object);
        ObjectMapper objectMapper = JsonMapper.builder().findAndAddModules().build();
        objectMapper.writeValue(new FileWriter(createOrRetrieve(DATASTORE_FOLDER + object.getClass().getSimpleName() + ".json")), updatedList);
        return object;
    }

    @Override
    public void uploadFiles(List<MultipartFile> multipartFileList, String folderName) {
        multipartFileList.forEach(multipartFile -> {
            try {
                File newFile = createOrRetrieve(UPLOAD_FOLDER + folderName + "/" + multipartFile.getOriginalFilename());
                Files.write(newFile.toPath(), multipartFile.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    private static <T extends IdentifiableEntity> Long getNextId(List<T> updatedList) {
        return updatedList.stream().map(IdentifiableEntity::getId).max(Long::compareTo).orElse(0L) + 1L;
    }

    private File createOrRetrieve(String target) throws IOException {
        Path path = Paths.get(target);
        Path parent = path.getParent();
        if (parent != null && Files.notExists(parent)) {
            Files.createDirectories(parent);
        }
        if (Files.notExists(path)) {
            return Files.createFile(path).toFile();
        }
        return path.toFile();
    }
}
