<template>
  <div class="row">
    <div class="col-md-7">
      <card class="bg-secondary" header-classes="bg-white px-4 py-2" no-footer-line>
        <template slot="header">
          <div class="row align-items-center">
            <div class="col-8">
              <h3 class="card-title m-0">{{ name }}</h3>
            </div>
          </div>
        </template>
        <div class="row">
          <div class="col-md-10 col-md-offset-2">
            <div v-if="hasTokens">
              <fg-input
                placeholder="Amount to mint"
                v-model="minting.amount">
                <template slot="addonLeft">
                  <span class="input-group-text">Mint Tokens</span>
                </template>
                <template slot="addonRight">
                  <div class="btn-group" role="group">
                    <button :disabled="work.minting" class="btn btn-success" type="button" @click="mint()">
                      <div v-if="work.minting"> processing.. </div>
                      <div v-else> mint </div>
                    </button>
                  </div>
                </template>
              </fg-input>
              <fg-input
                placeholder="5552639850"
                v-model="notify.phone">
                <template slot="addonLeft">
                  <span class="input-group-text">Phone</span>
                </template>
                <template slot="addonRight">
                  <div class="btn-group" role="group">
                    <button :disabled="work.notify" class="btn btn-success" type="button" @click="setPhone()">
                      <div v-if="work.notify"> processing.. </div>
                      <div v-else> notify </div>
                    </button>
                  </div>
                </template>
              </fg-input>
            </div>
            <div v-else>
              <fg-input
                placeholder="symbol"
                v-model="token.symbol">
                <template slot="addonLeft">
                  <span class="input-group-text">Share Symbol</span>
                </template>
                <template slot="addonRight">
                  <div class="btn-group" role="group">
                    <button :disabled="work.settingSymbol" class="btn btn-success" type="button" @click="setSymbol(token.symbol)">
                      <div v-if="work.settingSymbol"> processing.. </div>
                      <div v-else> set </div>
                    </button>
                  </div>
                </template>
              </fg-input>
            </div>
          </div>
        </div>

        <!-- <vue-json-pretty :data="snapshot"></vue-json-pretty> -->
      </card>
    </div>
    <div class="col-md-5">
      <stats-card
        type="success"
        :title="snapshot.token.supply"
        subTitle="Total Supply"
        icon="now-ui-icons business_money-coins">
        <span slot="footer">
          <i class="now-ui-icons files_paper"></i>
          {{ snapshot.token.address }}
        </span>
      </stats-card>
      <stats-card
        type="success"
        :title="snapshot.token.balance"
        subTitle="My Balance"
        icon="now-ui-icons objects_diamond">
      </stats-card>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import VueJsonPretty from 'vue-json-pretty';
import { Table, TableColumn } from 'element-ui';
import { TabPane, Tabs, TimeLine, TimeLineItem, StatsCard } from '@/components';
import { UserCard } from '@/components/Registrar';

export default {
  name: 'company',
  props: { fqn: String },
  components: {
    VueJsonPretty,
    TimeLine,
    TimeLineItem,
    UserCard,
    StatsCard
  },
  data() {
    return {
      token: { name: '', symbol: ''},
      minting: { amount: 100 },
      notify: { phone: '' },
      fresh: false,
      work: {
        minting: false,
        settingSymbol: false
      }
    };
  },
  computed: {
    ...mapGetters(['account']),
    hasTokens() { return this.snapshot.token.created; },
    name() {
      return this.snapshot.record.name === 'Empty Record' ? this.snapshot.label : this.snapshot.record.name;
    }
  },
  asyncComputed: {
    company: {
      get() { return this.$dwns.resolve(this.fqn); },
      default: false
    },
    snapshot: {
      get() {
        if(!this.fresh) { this.fresh = true; };
        return this.company ? this.company.snapshot() : {token: {}, record: {}};
      },
      default: {token: {}, record: {}}
    }
  },
  methods: {
    async setSymbol(symbol) {
      this.work.settingSymbol = true;
      await this.company.createToken(this.token.symbol, this.token.symbol);
      this.fresh = false;
      this.work.settingSymbol = false;
    },
    async mint() {
      this.work.minting = true;
      await this.company.mint(this.minting.amount);
      this.fresh = false;
      this.work.minting = false;
    },
    async setPhone() {
      this.work.minting = true;
      await this.company.mint(this.minting.amount);
      this.fresh = false;
      this.work.minting = false;
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
  &:disabled, &[disabled], &.disabled {
    opacity: .9;
  }
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
