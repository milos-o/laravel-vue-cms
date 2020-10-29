<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users</h3>

                        <div class="card-tools">
                            <button class="btn btn-success" data-toggle="modal" data-target="#add-user">Add New User <i
                                class="fas fa-user-plus fa-fw"></i></button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Created At</th>
                                <th>Modify</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{ user.id }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td><span class="tag tag-success">{{ user.type | upText }}</span></td>
                                <td><span class="tag tag-success">{{ user.created_at | myDate }}</span></td>
                                <td>
                                    <button class="btn btn-primary"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-danger"><i class="fa fa-trash"></i></button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>
        <div class="modal fade" id="add-user" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="createUser" @keydown="form.onKeydown($event)">
                        <div class="modal-body">
                            <div class="form-group">
                                <input placeholder="Enter name" v-model="form.name" type="text" name="name"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <input placeholder="Enter email" v-model="form.email" type="email" name="email"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            <div class="form-group">
                                <input placeholder="Enter password" v-model="form.password" type="password"
                                       name="password"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>
                            </div>
                            <div class="form-group">
                                <select id="type" v-model="form.type" name="type"
                                        class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                    <option value="">Select User Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Author">Author</option>
                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>
                            <div class="form-group">
                                <textarea placeholder="Enter bio" v-model="form.bio" type="text" name="bio"
                                          class="form-control"
                                          :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>
                            <!--                            <div class="form-group">-->
                            <!--                                <input placeholder="Enter text" v-model="form.photo" type="text" name="photo"-->
                            <!--                                       class="form-control" :class="{ 'is-invalid': form.errors.has('photo') }">-->
                            <!--                                <has-error :form="form" field="photo"></has-error>-->
                            <!--                            </div>-->
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-success" style="float: left">Create</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Users",
    data() {
        return {
            users: [],
            form: new Form({
                name: '',
                email: '',
                password: '',
                type: '',
                bio: '',
                photo: ''
            })
        }
    },
    methods: {
        createUser(){
            this.$Progress.start()
            this.form.post('api/user')
            Fire.$emit('load-users');
            $('#add-user').modal('hide');
            Toast.fire({
                icon: 'success',
                title: 'User Created successfully'
            })
            this.$Progress.finish()
        },
        loadUsers(){
            axios.get('api/user')
                .then(({ data }) => (this.users = data.data));
        }
    },
    mounted() {
        this.loadUsers();
        Fire.$on('load-users', () => this.loadUsers());
    }
}
</script>

<style scoped>

</style>
