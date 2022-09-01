package net.webius.randomlunchfood.service;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import net.webius.randomlunchfood.utils.StringBuilderUtils;

@Service
public class FileService {
	private final String dirName = "upload";
	
	public String upload(MultipartFile file) {
		String fileFullName = null;
		Path uploadLocation = null;
		
		try {
			while (true) {
				String[] fileNameList = file.getOriginalFilename().split("\\.");
				String fileExtension = fileNameList[fileNameList.length - 1];
				String fileName = StringBuilderUtils.getRandomString(16);
				Path uploadPath = Paths.get(ClassLoader.getSystemResource(dirName).toURI());
				
				fileFullName = fileName + "." + fileExtension;
				uploadLocation = Paths.get(uploadPath.toString() + File.separator + StringUtils.cleanPath(fileFullName));
				
				if (!Files.exists(uploadLocation)) {
					break;
				}
			}
			
			Files.copy(file.getInputStream(), uploadLocation, StandardCopyOption.REPLACE_EXISTING);
		} catch (URISyntaxException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		
		return fileFullName;
	}
}
