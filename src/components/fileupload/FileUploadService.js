
// import $ from 'jquery';
import axios from 'axios';
import { Observable } from 'rxjs';

const API_BASE_URL = 'http://localhost:8080';
export const API_UPLOAD_URL = `${API_BASE_URL}/uploadservice/upload`;
export const API_SAVE_URL = `${API_BASE_URL}/uploadservice/saveData`;
export const API_GET_ALL_URL = `${API_BASE_URL}/uploadservice/findAll`;

// Use of these requires that you add the file id to the path
export const API_GET_ONE_BASE_URL = `${API_BASE_URL}/uploadservice/find`;
export const API_DELETE_BASE_URL = `${API_BASE_URL}/uploadservice/delete`;


class FileUploadService {

    upload(file) {
        // console.log(`File to upload in FileUploadService: `, file);
        let formData = new FormData();
        formData.append('uploadedFile', file);
        // Note: Do NOT add headers
        return Observable.fromPromise(axios.post(API_UPLOAD_URL, formData))
            // .map((response) => response.json())
            .catch(error => Observable.throw(error));
    }

    saveFileMetadata(fileData) {
        let formData = new FormData();
        formData.append('id', fileData.id);
        formData.append('title', fileData.title);
        formData.append('description', fileData.description);
        formData.append('filename', fileData.filename);
        formData.append('createDate', fileData.createDate);
        // let headers = new Headers();
        // headers.append('Accept', 'application/json');
        // let options = new RequestOptions({ headers: headers });
        return Observable.fromPromise(axios.post(API_SAVE_URL, formData))
            // .map((response) => response.json())
            .catch(error => Observable.throw(error));
    }

    findAllMetadata() {
        return Observable.fromPromise(axios.get(API_GET_ALL_URL))
            // .map((response) => response.json())
            .catch(error => Observable.throw(error));
    }

    findById(id) {
        return Observable.fromPromise(axios.get(`${API_GET_ONE_BASE_URL}/${id}`))
            // .map((response) => response.json())
            .catch(error => Observable.throw(error));
    }

    delete(id) {
        return Observable.fromPromise(axios.get(`${API_DELETE_BASE_URL}/${id}`))
            // .map((response) => response.json())
            .catch(error => Observable.throw(error));
    }

}

export default FileUploadService;
