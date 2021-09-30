<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

import Stat from "./widget";




import Transaction from './transaction';

/**
 * Dashboard component
 */
export default {
  components: {
    Layout,
    PageHeader,
    Stat,

   
  
 
    Transaction
  },
  data() {
    return {
      title: "Dashboard",
    };
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <div class="row">
      <div class="col-xl-12">
        <Stat />
     
      </div>
    
    </div>
    <div class="row">
      <div class="col-lg-4">
       
      </div>
      <div class="col-lg-4">
       
      </div>
      <div class="col-lg-4">
       
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <Transaction />
      </div>
    </div>
  </Layout>
</template>