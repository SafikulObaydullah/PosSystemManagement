using Stock_DataAccess.Helper;
using Stock_DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public class UnitofWork : IUnitofWork
    {
        #region field
        private StockModel _context;
        private IInstituteRepository? _instituteRepository;
        private InsBranchRepository? _instituteBranchRepository;
        private ILoginModelRepository _loginmodelRepository;
        private ICategoryRepository? _categoryRepository;
        private IProductRepository? _productRepository;
        private IProductDetailRepository? _ProductDetailRepository;
        private IProductTablesRepository? _ProductTablesRepository;
        private IVoucherRepository? _voucherRepository;
        private IUnitRepository? _UnitRepository;
        private IInvoiceRepository? _InvoiceRepository;
        private IPurcahseMasterRepository? _PurchaseMasterRepository;
        private IBusinessPartnerRepository? _BusinessPartnerRepository;
        private IPaymentMethodRepository? _PaymentMethodRepository;
        private IStockRepository? _StockRepository;
        private ITransactionMaster? _TransactionMasterRepository;
        private ISalesMasterRepository? _SalesMasterRepository;
        private ISalesRepository? _SalesRepository;
        private IDateTimeFormatRepository? _DateTimeFormatRepository;
        private IAccountRepo? _AccountRepo;
        private ILaptopRepository? _LaptopRepository;
        private IExpensesRepository? _ExpensesRepository; 
        private IDocumentUpload? _DocumentUploadRepository; 
        private IBrandRepository? _BrandRepository; 
        private ISubCateogyRepository? _SubCateogyRepository;
        private ICustomerReposity? _customerReposity;
        #endregion
        public UnitofWork(StockModel context)
        {
            _context = context;
        }
        public StockModel DbContext
        {
            get { return _context; }

        }
        public ILoginModelRepository LoginModelRepository
        {
            get
            {
                if (_loginmodelRepository == null)
                {
                    _loginmodelRepository = new LoginModelRepository(_context);
                }
                return _loginmodelRepository;
            }
        }
        public IProductDetailRepository ProductDetailRepository
        {
            get
            {
                if (_ProductDetailRepository == null)
                {
                    _ProductDetailRepository = new ProductDetailRepository(_context);
                }
                return _ProductDetailRepository;
            }
        } 
        public IProductTablesRepository ProductTablesRepository
        {
            get
            {
                if(_ProductTablesRepository == null)
                {
                    _ProductTablesRepository = new ProductTablesRepository(_context);
                }
                return _ProductTablesRepository;
            }
        }
        public IInstituteRepository InstituteRepository
        {
            get
            {
                if (_instituteRepository == null)
                {
                    _instituteRepository = new InstituteRepository(_context);
                }
                return _instituteRepository;
            }
        }
        public ICustomerReposity CustomerReposity
        {
            get
            {
                if (_customerReposity == null)
                {
                    _customerReposity = new CustomerReposityRepository(_context);
                }
                return _customerReposity;
            }
        }
        public ICategoryRepository CategoryRepository
        {
            get
            {
                if (_categoryRepository == null)
                {
                    _categoryRepository = new CategoryRepository(_context);
                }
                return _categoryRepository;
            }
        }
        public IUnitRepository UnitRepository
        {
            get
            {
                if (_UnitRepository == null)
                {
                    _UnitRepository = new UnitRepository(_context);
                }
                return _UnitRepository;
            }
        }
        public IInvoiceRepository InvoiceRepository
        {
            get
            {
                if (_InvoiceRepository == null)
                {
                    _InvoiceRepository = new InvoiceRepository(_context);
                }
                return _InvoiceRepository;
            }
        }
        public IVoucherRepository VoucherRepository
        {
            get
            {
                if (_voucherRepository == null)
                {
                    _voucherRepository = new VoucherRepository(_context);
                }
                return _voucherRepository;
            }
        }
        public IProductRepository ProductRepository
        {
            get
            {
                if (_productRepository == null)
                {
                    _productRepository = new ProductRepository(_context);
                }
                return _productRepository;
            }
        }
        public InsBranchRepository InstituteBranchRepository
        {
            get
            {
                if (_instituteBranchRepository == null)
                {
                    _instituteBranchRepository = new InsBranchRepository(_context);
                }
                return _instituteBranchRepository;
            }
        }
        public IPurcahseMasterRepository PurchaseMasterRepository
        {
            get
            {
                if (_PurchaseMasterRepository == null)
                {
                    _PurchaseMasterRepository = new PurcahseMasterRepository(_context);
                }
                return _PurchaseMasterRepository;
            }
        }
        public IBusinessPartnerRepository BusinessPartnerRepository
        {
            get
            {
                if (_BusinessPartnerRepository == null)
                {
                    _BusinessPartnerRepository = new BusinessPartnerRepository(_context);
                }
                return _BusinessPartnerRepository;
            }
        }
        public IPaymentMethodRepository? PaymentMethodRepository
        {
            get
            {
                if (_PaymentMethodRepository == null)
                {
                    _PaymentMethodRepository = new PaymentMethodRepository(_context);
                }
                return _PaymentMethodRepository;
            }
        }
        public IStockRepository? StockRepository
        {
            get
            {
                if (_StockRepository == null)
                {
                    _StockRepository = new StockRepository(_context);
                }
                return _StockRepository;
            }
        }
        public ITransactionMaster TransactionMasterRepository
        {
            get
            {
                if (_TransactionMasterRepository == null)
                {
                    _TransactionMasterRepository = new TransactionMaster(_context);
                }
                return _TransactionMasterRepository;
            }
        }
        public ISalesMasterRepository SalesMasterRepository
        {
            get
            {
                if (_SalesMasterRepository == null)
                {
                    _SalesMasterRepository = new SalesMasterRepository(_context);
                }
                return _SalesMasterRepository;
            }
        }
        public ISalesRepository SalesRepository
        {
            get
            {
                if (_SalesRepository == null)
                {
                    _SalesRepository = new SalesRepository(_context);
                }
                return _SalesRepository;
            }
        }
         
        public IDateTimeFormatRepository DateTimeFormatRepository
        {
            get
            {
                if (_DateTimeFormatRepository == null)
                {
                    _DateTimeFormatRepository = new DateTimeFormatRepository(_context);
                }
                return _DateTimeFormatRepository;
            }
        }
        public IAccountRepo accountRepo
        {
            get
            {
                if (_AccountRepo == null)
                {
                    _AccountRepo = new AccountRepository(_context);
                }
                return _AccountRepo;
            }
        }
        public ILaptopRepository LaptopRepository
        {
            get
            {
                if (_LaptopRepository == null)
                {
                    _LaptopRepository = new LaptopRepository(_context);
                }
                return _LaptopRepository;
            }
        }
        public IExpensesRepository ExpensesRepository
        {
            get
            {
                if (_ExpensesRepository == null)
                {
                    _ExpensesRepository = new ExpenseRepository(_context);
                }
                return _ExpensesRepository;
            }
        }
        public IDocumentUpload DocumentUploadRepository
        {
            get
            {
                if (_DocumentUploadRepository == null)
                {
                    _DocumentUploadRepository = new DocumentUploadRepository(_context);
                }
                return _DocumentUploadRepository;
            }
        }

        public IBrandRepository BrandRepository
        {
            get
            {
                if (_BrandRepository == null)
                {
                    _BrandRepository = new BrandRepository(_context);
                }
                return _BrandRepository;
            }
        }

        public ISubCateogyRepository SubCateogyRepository 
        {
            get
            {
                if (_SubCateogyRepository == null)
                {
                    _SubCateogyRepository = new SubCategoryRepository(_context);
                }
                return _SubCateogyRepository;
            }
        }

        public ModelsMessage Save()
        {
            ModelsMessage modelMessage = new ModelsMessage();
            string msg = "";
            try
            {
                if (_context.SaveChanges() > 0)
                {
                    modelMessage.Message = $"Action committed Successfully";
                    modelMessage.IsSuccess = true;
                }
                else
                {
                    modelMessage.Message = "Action Failed";
                    modelMessage.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                {
                    modelMessage.Message = ex.InnerException.Message;
                    modelMessage.IsSuccess = false;
                }
                else
                {
                    modelMessage.Message = ex.Message;
                    modelMessage.IsSuccess = false;
                }
            }
            return modelMessage;
        }
    }
    public interface IUnitofWork
    {
        ILaptopRepository LaptopRepository { get; }
        IAccountRepo accountRepo { get; }
        ISalesMasterRepository SalesMasterRepository { get; }
        ISalesRepository SalesRepository { get; }
        IDateTimeFormatRepository DateTimeFormatRepository { get; }
        IStockRepository StockRepository { get; }
        ITransactionMaster TransactionMasterRepository { get; }
        IInstituteRepository InstituteRepository { get; }
        InsBranchRepository InstituteBranchRepository { get; }
        IExpensesRepository ExpensesRepository { get; }
        ICategoryRepository CategoryRepository { get; } 
        ISubCateogyRepository SubCateogyRepository { get; } 
        IBrandRepository BrandRepository { get; } 
        IDocumentUpload DocumentUploadRepository { get; } 
        IUnitRepository UnitRepository { get; }
        IInvoiceRepository InvoiceRepository { get; }
        IPurcahseMasterRepository PurchaseMasterRepository { get; }
        IBusinessPartnerRepository? BusinessPartnerRepository { get; }
        IPaymentMethodRepository? PaymentMethodRepository { get; }
        IProductRepository ProductRepository { get; }
        IProductTablesRepository ProductTablesRepository { get; }
        IProductDetailRepository ProductDetailRepository { get; }
        IVoucherRepository VoucherRepository { get; }
        ILoginModelRepository LoginModelRepository { get; }
        ICustomerReposity CustomerReposity { get; }
        ModelsMessage Save();
        //ModelsMessage Orderby();
    }

}
