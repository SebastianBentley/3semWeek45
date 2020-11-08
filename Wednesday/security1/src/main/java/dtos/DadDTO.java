package dtos;

public class DadDTO {

    private String id, joke, status;

    public DadDTO(String id, String joke, String status) {
        this.id = id;
        this.joke = joke;
        this.status = status;
    }

    public DadDTO() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getJoke() {
        return joke;
    }

    public void setJoke(String joke) {
        this.joke = joke;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
