<template>
    <div>
        <v-card class="ma-5 px-2 pb-5">
            <v-card-title>
                <h2>Disc Library</h2>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search you library"
                    single-line
                    hide-details
                ></v-text-field>
                <v-btn color="green lighten-1 mt-3 ml-5" dark @click="createNewItem()">Add New Disc</v-btn>
            </v-card-title>

            <v-data-table
                :headers="headers"
                :items="discs"
                :options="{itemsPerPage: 10}"
                :search="search"
                :items-per-page="5"
                :loading="loading"
            >
                <template v-slot:item.actions="{ item }">
                    <v-icon color="orange" @click="editItem(item)">{{ editIcon }}</v-icon>
                    <v-icon color="red" @click="deleteItem(item)">{{ deleteIcon }}</v-icon>
                </template>

            </v-data-table>
        </v-card>
        <v-dialog v-model="modal" width="500">

            <v-card>
                <v-card-title class="headline grey lighten-2">
                    {{selectedDisc.data.title.length === 0 ? "New Title" : selectedDisc.data.title}}
                </v-card-title>

                <v-form ref="form" v-model="valid">
                    <v-container>
                        <v-row no-gutters>
                            <v-col cols="12" md="5">
                                <v-text-field
                                    v-model="selectedDisc.data.title"
                                    label="Title"
                                    :rules="[i => !!i || 'Title is required']"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="5" offset-md="2">
                                <v-select
                                    v-model="selectedDisc.data.kind"
                                    :rules="[i => !!i || 'Kind is required']"
                                    :items="Array.from(diskManager.getKinds())"
                                    label="Kind"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row no-gutters class="pt-3">
                            <v-col cols="12">
                                <v-text-field
                                    v-model.number="selectedDisc.data.release"
                                    label="Release Year"
                                    type="number"
                                    :rules="[i => !!i || 'Release year is required']"
                                    min="0"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    v-model="selectedDisc.data.type"
                                    :rules="[i => !!i || 'Type is required']"
                                    :items="Array.from(diskManager.getTypes())"
                                    label="Type"
                                ></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model.number="selectedDisc.data.amount"
                                    :rules="[i => !!i || 'Number of Discs is required']"
                                    label="Number of Discs"
                                    type="number"
                                    min="1"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-if="!creating" color="orange lighten-1" @click="updateItem()" dark :loading="processing">
                        Update
                    </v-btn>
                    <v-btn v-else color="green" dark @click="createItem()" :loading="processing">Create</v-btn>
                    <v-btn color="grey" dark @click="modal = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>


</template>

<script lang="ts">
    import {Component, Ref} from "vue-property-decorator";
    import Vue from 'vue'
    import {lazyInject} from "../../config/inversify.config";
    import {ObjectService} from "@/_services/object.service";

    import {Disc, DTObject, Tables} from "@/types/object"
    import {mdiDelete, mdiPencil} from "@mdi/js";
    import {VForm} from "@/types/vuetify";
    import {DiskManager} from "@/managers/disk.manager";


    @Component({
        components: {}
    })
    export default class DiscTable extends Vue {

        @lazyInject(ObjectService)
        public objectService!: ObjectService;

        @lazyInject(DiskManager)
        public diskManager!: DiskManager;

        private headers = [
            {text: 'Title', value: 'data.title'},
            {text: 'Type', value: 'data.type'},
            {text: 'Kind', value: 'data.kind'},
            {text: 'Number of Discs', value: 'data.amount'},
            {text: 'Release Year', value: 'data.release'},
            {text: 'Actions', value: 'actions', sortable: false},
        ]

        private deleteIcon: string = mdiDelete;
        private editIcon: string = mdiPencil;
        private modal: boolean = false;

        private selectedDisc: DTObject<Disc> = {...this.diskManager.createEmptyDisc()};

        private valid: boolean = true;
        private creating: boolean = false;
        private processing: boolean = false;

        private loading: boolean = true;
        private discs: DTObject<Disc>[] = [];
        private search: string = "";

        @Ref()
        readonly form!: VForm;

        createNewItem() {
            this.selectedDisc = this.diskManager.createEmptyDisc();
            this.modal = true;
            this.creating = true;
            this.$nextTick(() => this.form.resetValidation())
        }

        createItem() {
            if (this.form.validate()) {
                this.processing = true;
                this.objectService.createObject<Disc>({
                    dataschema: Tables.DISC_TABLE,
                    data: this.selectedDisc.data
                }).then(data => {
                    this.discs.push(data);
                    this.modal = false;
                }).finally(() => this.processing = false)
            }
        }

        updateItem() {

            if (this.form.validate()) {
                this.processing = true;
                if (!this.selectedDisc.id) return;
                this.objectService.updateObject<Disc>(this.selectedDisc.id, this.selectedDisc.data)
                    .then(data => {
                        this.discs[this.discs.findIndex(item => item.id === this.selectedDisc.id)].data = data.data;
                        this.modal = false;
                    })
                    .finally(() => this.processing = false)
            }
        }

        deleteItem(disc: DTObject<Disc>) {
            this.loading = true;

            if (!disc.id) return;

            this.objectService.deleteObject(disc.id)
                .then(() => {
                    this.discs.splice(this.discs.indexOf(disc), 1)
                })
                .finally(() => this.loading = false)
        }


        editItem(disc: DTObject<Disc>) {
            this.selectedDisc = JSON.parse(JSON.stringify(disc))
            this.modal = true;
            this.creating = false;
        }

        async mounted() {
            this.discs = await this.objectService.getObject<Disc>(Tables.DISC_TABLE)
            this.loading = false;
        }

    }
</script>


