package net.webius.randomlunchfood.service;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
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
			URL uploadUrl = ClassLoader.getSystemResource(dirName);
			Path uploadPath = null;
			if (uploadUrl == null) {
				uploadPath = Paths.get("/var/lib/tomcat9/webapps/Random-Food__upload");

				if (!Files.exists(uploadPath)) {
					Files.createDirectory(uploadPath);
				}
			} else {
				uploadPath = Paths.get(uploadUrl.toURI());
			}

			while (true) {
				String[] fileNameList = file.getOriginalFilename().split("\\.");
				String fileExtension = fileNameList[fileNameList.length - 1];
				String fileName = StringBuilderUtils.getRandomString(16);
				
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
