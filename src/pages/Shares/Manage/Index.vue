<template>
  <div class="row">
    <div class="col-lg-12 col-md-12">
      <div class="row">
        <div class="col-sm-3">
          <card class="bg-secondary" header-classes="bg-white px-4 py-2" no-footer-line>
            <template slot="header">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="card-title m-0">Companies</h3>
                </div>
              </div>
            </template>
            <ul class="list-group">
              <li
                class="list-group-item"
                :class="{active: (currentCompany === '@welcome')}"
                v-on:click="currentCompany = '@welcome'"
              >
                Welcome to Shares
              </li>
              <li
                class="list-group-item"
                :class="{active: (currentCompany === company.fqn)}"
                v-for="company in companies"
                v-on:click="currentCompany = company.fqn"
              >
                {{ company.fqn }}
              </li>
            </ul>
            </br>
            <fg-input
              placeholder="Company Subdomain"
              v-model="newCompany.label">
              <template slot="addonLeft">
                <span class="input-group-text">Subdomain</span>
              </template>
              <template slot="addonRight">
                <div class="btn-group" role="group">
                  <button :disabled="work.registering" class="btn btn-success" type="button" @click="register(newCompany.label)">
                    <div v-if="work.minting"> processing.. </div>
                    <div v-else> register </div>
                  </button>
                </div>
              </template>
            </fg-input>
          </card>
        </div>
        <div class="col-sm-9">
          <div v-if="currentCompany === '@welcome'">
            <card class="card">
              <h5 slot="header" class="card-title">Welcome</h5>
            </card>
          </div>
          <div v-else>
            <company :fqn="currentCompany"></company>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import VueJsonPretty from 'vue-json-pretty';
import { Table, TableColumn } from 'element-ui';
import { TabPane, Tabs, TimeLine, TimeLineItem } from '@/components';
import { UserCard } from '@/components/Registrar';
import Company from './Company';

export default {
  components: {
    VueJsonPretty,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    TabPane,
    Tabs,
    TimeLine,
    TimeLineItem,
    UserCard,
    Company
  },
  data() { return {
    currentCompany: '@welcome',
    newCompany: {label: ''},
    fresh: false,
    work: {
      registering: false
    }
  }; },
  computed: { ...mapGetters(['account']) },
  asyncComputed: {
    allCompanies: {
      get() { return this.$dwns.resolve('shares'); },
      default: false
    },
    ownedDomains: {
      get() {
        if(!this.fresh) { this.fresh = true; };
        return this.$dwns.domainsOwnedBy(this.account);
      },
      default: []
    },
    companies: {
      get() {
        return this.domainDetails.filter((domain) => {
          return domain.parent === "0x0fd4c2b4a3b01b251a8ddb144ee0d00ab0d25d8751067c8e729629b6aca01524";
        });
      },
      default: []
    },
    domainDetails: {
      get() {
        return Promise.all(this.ownedDomains.map((domain) => { return domain.details(); }));
      },
      default: []
    }
  },
  methods: {
    async register(label) {
      this.work.registering = true;
      await this.allCompanies.register(label);
      this.fresh = false;
      this.newCompany.label = '';
      this.work.registering = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.input-group .input-group-text {
  font-size: .8rem;
  border-radius: 30px;
  min-width: 100px;
  &:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}
.input-group .btn-group {
  margin-left: -20px;
}
.input-group .btn {
  margin: 0;
  padding: 10px 22px;
  border-radius: 30px;
  z-index: 10;
  &:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  &:not(:last-child) {
    border-right: 1px solid #eee;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
