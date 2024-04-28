<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h2>Contacts</h2>
        <hr>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Country</th>
              <th scope="col">Name</th>
              <th scope="col">Website</th>
              <th scope="col">Default Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input class="form-control" v-model="addContactForm.country" type="text" placeholder="Enter Country"/></td>
              <td><input class="form-control" v-model="addContactForm.name" type="text" placeholder="Enter Name"/></td>
              <td><input class="form-control" v-model="addContactForm.website" type="text" placeholder="Enter Website"/></td>
              <td><input class="form-control" v-model="addContactForm.default_email" type="text" placeholder="Enter Email"/></td>
              <td>
                <button type="submit" class="btn btn-success btn-sm" @click="handleSubmitContact">Save</button>
              </td>
            </tr>
            <tr v-for="contact, item in contacts">
              <td>{{ contact.country }}</td>
              <td>{{ contact.name }}</td>
              <td>{{ contact.website }}</td>
              <td>{{ contact.default_email }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-warning btn-sm">Update</button>
                  <button type="button" class="btn btn-danger btn-sm" @click="deleteContact(contact.PK)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const webapp_site = 'http://localhost:5001'

const empty_new_contact = () => {
  console.log("created empty")
  return {
        country: '',
        name: '',
        website: '',
        default_email: ''
      }
}

export default {
  name: 'directory',
  data() {
    return {
      addContactForm: {},
      contacts: [
        empty_new_contact()
      ],
    };
  },
  methods: {
    getContacts() {
      const path = `${webapp_site}/contacts`;
      axios.get(path)
        .then((res) => {
          if(res.data.status == 'success'){
            this.contacts = res.data.contacts;
          }
          else{
            throw Error('Cannot access contact data');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    addContact(contact) {
      const path = `${webapp_site}/contacts`;
      axios.post(path, contact)
      .then(
        () => {
          this.getContacts();
        })
      .catch((error) => {
        console.error(error);
      });
    },

    deleteContact(id){
      const path = `${webapp_site}/contacts/${id}`
      axios.delete(path)
      .then(() => {
        this.getContacts();
      })
      .catch((error) => {
        console.error(error);
      });
    },

    handleSubmitContact(){
      this.addContact({
        country: this.addContactForm.country,
        name: this.addContactForm.name,
        website: this.addContactForm.website,
        default_email: this.addContactForm.default_email
      });
      this.initForm();
    },

    initForm() {
      this.addContactForm = empty_new_contact()
    }
  },
  created() {
    this.getContacts();
  },
};
</script>