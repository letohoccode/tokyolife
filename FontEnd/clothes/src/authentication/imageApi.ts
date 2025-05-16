import axios from "axios";

export const ImageApi = {
  uploadImage: async (formData: FormData) => {
    try {
      return await axios({
        url: 'http://localhost:8080/api/image/upload',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
        timeout : 30000
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error; 
    }
  },
  
  upLoadListImages: async (formData: FormData) => {
    try {
      return await axios({
        url: 'http://localhost:8080/api/image/uploadList',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
        timeout : 30000
      });
    } catch (error) {
      console.error('Error uploading multiple images:', error);
      throw error;
    }
  }
}
